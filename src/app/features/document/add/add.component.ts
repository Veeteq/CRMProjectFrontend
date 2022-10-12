import { DatePipe } from '@angular/common';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/alert/alert.service';
import { Account } from 'src/app/model/account';
import { UserService } from 'src/app/services/user.service';
import { AddDialogComponent } from '../../counterparty/add-dialog/add-dialog.component';
import { Counterparty } from '../../counterparty/model/counterparty';
import { CounterpartyService } from '../../counterparty/service/counterparty.service';
import { StatementDetailSummary } from '../../statement/model/statement-detail-summary';
import { StatementService } from '../../statement/service/statement.service';
import { DocumentService } from '../service/document.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  selected = "";
  formAction: string;
  formSubmitted: boolean = false;
  documentId: string;
  //title = 'FormArray Example in Angular Reactive forms';
  form: FormGroup;
  file: any;
  accounts: Observable<Account[]>;
  counterparties: Counterparty[];
  documentTypes: any[];
  paymentMethods: any[];
  statementDetails: StatementDetailSummary[];
  titles: string[];
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private documentService: DocumentService,
              private alertService: AlertService,
              private statementService: StatementService,
              private counterpartyService: CounterpartyService,
              private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.formAction = "Save";
    this.documentId = this.activatedRoute.snapshot.paramMap.get("id");

    this.documentService.getDocumentTypes().subscribe(
      data => {
        this.documentTypes = data;
      }
    );

    this.documentService.getPaymentMethods().subscribe(
      data => {
        this.paymentMethods = data;
      }
    );

    const currDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.form = this.formBuilder.group({
      id:              new FormControl(this.documentId),
      documentDate:    new FormControl(currDate, Validators.compose([Validators.required])),
      documentType:    new FormControl('', Validators.compose([Validators.required])),
      documentTitle:   new FormControl('', Validators.compose([Validators.required])),
      account:         new FormControl('', Validators.compose([Validators.required])),
      paymentMethod:   new FormControl('', Validators.compose([Validators.required])),
      counterparty:    new FormControl(new Counterparty),
      statementDetail: new FormControl(''),
      events:          this.formBuilder.array([])
    });

    this.loadAccounts();
    this.loadStatementDetails(currDate);
    this.loadCounterparties();
    this.loadTitles();

    this.events.valueChanges.subscribe(
      data => console.log(data)
    )
  }

  get account(): FormControl {
    return this.form.controls.account as FormControl;
  }

  get documentTitle(): FormControl {
    return this.form.controls.documentTitle as FormControl;
  }

  get documentType(): FormControl {
    return this.form.controls.documentType as FormControl;
  }

  get statementDetail(): FormControl {
    return this.form.controls.statementDetail as FormControl;
  }

  get counterparty(): FormControl {
    return this.form.controls.counterparty as FormControl;
  }

  get events(): FormArray {
    return this.form.controls.events as FormArray;
  }

  get eventControls() {
    return (this.form.controls.events as FormArray).controls as FormGroup[];
  }

  onSubmit(form: FormGroup): void {
    console.log("onSubmit: " + JSON.stringify(form.value));

    const isNew: boolean = this.form.controls.id.value ? false : true;
    this.documentService.saveDocument(form.value, isNew).subscribe(
      event => this.handleEvent(event),
      err => this.handleError(err)
    );
  }

  onDateChanged(event: MatDatepickerInputEvent<Date>) {
    const currDate = this.datePipe.transform(event.value, "yyyy-MM-dd");
    console.log("onDateChanged: " + currDate);
    this.loadStatementDetails(currDate);
  }

  onStatementDetailChange(detail: StatementDetailSummary) {
    console.log("onStatementDetailChangee: " + JSON.stringify(detail));
    this.account.setValue({
      id: detail.account.id,
      username: detail.account.username
    });
  }

  onAddCounterparty() {
    console.log("open");
    let config = new MatDialogConfig();
    config.width = '550px';
    config.data = {name: 'witek', animal: 'lion'};

    const dialogRef = this.dialog.open(AddDialogComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      this.counterparty.setValue(result);
      console.log('The dialog was closed with result: ' + JSON.stringify(result));
      this.formAction = result;
    });
  }
  
  counterpartyVisible(): boolean {
    return this.documentType.value && this.documentType.value !== 'NOTE';
  }

  bankStatementVisible(): boolean {
    return this.statementDetails && this.statementDetails.length > 0;
  }

  addCounterpartyVisible(): boolean {
    const counterparty: Counterparty = this.counterparty.value;
    return !(typeof counterparty === 'object');
  }

  resetForm(): void {}


  displayAccount(account: Account): string {
    return account && account.username ? account.username : '';
  }

  displayDetail(detail : StatementDetailSummary): string {
    return detail ? detail.account.username + " | " + detail.operationDate + " | " + detail.title + " | " + detail.amount : '';
  }

  displayCounterparty(counterparty: Counterparty): string {
    return counterparty && counterparty.shortname ? counterparty.shortname : '';
  }

  displayTitle(title: string): string {
    return title ? title : '';
  }

  clearDocumentTitle() {
    this.documentTitle.setValue(null);
  }

  private loadAccounts() {
    this.accounts = this.form.controls.account.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this.filterAccounts(value))
    );
  }

  private loadStatementDetails(currDate: string) {
    this.statementService.findStatementDetailsByDate(currDate).subscribe(
      data => {
        this.statementDetails = data.body;
      }
    );
  }

  private loadCounterparties() {
    this.counterparty.valueChanges.pipe(
      startWith(''),
      filter(res => {
        return res !== null && res.length >= 3
      }),
      distinctUntilChanged(),
      debounceTime(100),
      tap(() => {
        this.isLoading = true;
        this.counterparties = [];
      }),
      switchMap((value) => this.counterpartyService.getCounterpartiesByName(value).pipe(
        finalize(() => {          
          this.isLoading = false
        })
      ))
    ).subscribe(
      data => {
        console.log(data);
        this.counterparties = data;
      }
    )
  }

  private loadTitles() {
    this.documentTitle.valueChanges.pipe(
      startWith(''),
      filter(res => {
        return res !== null && res.length >= 1
      }),
      //distinctUntilChanged(),
      //debounceTime(100),
      tap((val) => {
        console.log("val: " + val);
        this.isLoading = true;
        this.titles = [];
      }),
      switchMap((value) => this.documentService.getUniqueTitles(value).pipe(
        finalize(() => {          
          this.isLoading = false
        })
      ))
    ).subscribe(
      data => {
        console.log(data);
        this.titles = data;
      }
    )
  }

  private filterAccounts(value: string): Observable<Account[]> {
    return this.userService.getAccounts().pipe(
      filter(data => !!data),
      map(data => {
        return data.filter(option => option.username.toLowerCase().includes(value));
      })
    )
  }

  private handleEvent(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      let response: HttpResponse<any> = <HttpResponse<any>>event;
      if (response.status == 201) {
        this.alertService.success('Bank statment created', true);
        this.formSubmitted = true;
      }
    }
  }

  private handleError(err: any) {
    console.error("Error is:", err);
    this.alertService.error(err, true);
  }
}

