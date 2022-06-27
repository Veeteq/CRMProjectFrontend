import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap, filter, tap } from 'rxjs/operators';
import { StatementService } from '../service/statement.service';
import { StatementDetail } from '../model/statement-detail';
import { UserService } from 'src/app/services/user.service';
import { StatementResponse } from '../model/statement-response';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('pdfView', {static: true}) pdfView: ElementRef;
  file: File;
  statementDetails: StatementDetail[] = [];
  form: FormGroup;
  filteredOptions: Observable<any[]>;
  formSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, 
              private userService: UserService, 
              private statementService: StatementService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      account:    new FormControl('',         Validators.compose([Validators.required])),
      reportDate: new FormControl(new Date(), Validators.compose([Validators.required])),
      fileName:   new FormControl('',         Validators.compose([Validators.required]))
    });

    this.filteredOptions = this.form.controls.account.valueChanges
      .pipe(
        startWith(''),
        switchMap((value) => this._filter(value))
      );

  }

  get account(): FormControl {
    return this.form.controls.account as FormControl;
  }

  get fileName(): FormControl {
    return this.form.controls.fileName as FormControl;
  }

  onSubmit(form: FormGroup) {
    console.log("onSubmit: " + JSON.stringify(form.value));
    form.addControl('details', this.formBuilder.array(this.statementDetails));

    let formData = new FormData();
    formData.append('file', this.file);
    formData.append('data', JSON.stringify(form.value));
    this.statementService.saveStatement(formData).subscribe(
      data => {
        this.statementDetails.push(data);
        this.formSubmitted = true;
      },
      err => this.handleError(err)
    );
  }  

  onFileSelected(event: any) {
    console.log("onFileSelected: " + JSON.stringify(event.target));
    const file: File = event.target.files[0];

    if (file) {
      this.fileName.setValue(file.name);
      this.file = file;
      this.showData();

      let userId = this.account.value.id
      this.parseStatement(file, userId);
    }
  }

  displayFn(account: any): string {
    return account && account.username ? account.username : '';
  }

  resetForm() {
    console.log("resetForm");
    this.form.reset();
    this.fileUpload.nativeElement.value = '';
    this.file = null;
    //this.fileName.setValue(null);
    this.pdfView.nativeElement.setAttribute('data', '');
  }
  
  private async showData() {
    let pdfContent = URL.createObjectURL(this.b64toBlob(await this.toBase64(this.file), 'application/pdf')) + '#toolbar=0&navpanes=0&scrollbar=0&view=FitH';
    this.pdfView.nativeElement.setAttribute('data', pdfContent);
  }

  private _filter(value: string): Observable<any[]> {
    return this.userService.getUsers().pipe(
      tap(data => console.log("tap: " + JSON.stringify(data))),
      filter(data => !!data),
      map(data => {
        return data.filter(option => option.username.toLowerCase().includes(value))
      })
    )
  }  

  private toBase64(file: File): any {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result!.toString().replace(/^data:(.*,)?/, '');
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }

  private b64toBlob(b64Data: string, contentType: string): Blob {
    var byteCharacters = atob(b64Data);

    var byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      var slice = byteCharacters.slice(offset, offset + 512),
        byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    let blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  private parseStatement(file: File, userId: number) {
    let formData = new FormData();
    formData.append('file', this.file);
    this.statementService.parseStatement(formData, userId).subscribe(
      data => this.handleResponse(data),
      err => this.handleError(err)
    );
  }  

  private handleResponse(data: StatementResponse) {
    this.statementDetails = data.details;
  }

  private handleError(err: any) {
    console.error("Error is:", err);
    //this.displayError(err.message);
  }
}
