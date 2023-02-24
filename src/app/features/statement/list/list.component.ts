import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfirmationDialog } from 'src/app/util/confirmation-dialog/confirmation-dialog';
import { ConfirmationDialogComponent } from 'src/app/util/confirmation-dialog/confirmation-dialog.component';
import { StatementSummary } from '../model/statement-summary';
import { StatementService } from '../service/statement.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  statements: StatementSummary[] = [];
  displayedColumns: string[] = ['num', 'fileName', 'reportDate', 'account', 'itemsCount', 'totalAmount', 'action'];
  pageSizeOptions: number[] = [30, 50];
  pageSize: number = 30;
  totalElements: number;
  dataSource: MatTableDataSource<StatementSummary> = new MatTableDataSource();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  
  @ViewChild(MatSort)
  sort: MatSort;
  
  constructor(private authenticationService: AuthenticationService,
              private statementService: StatementService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log("ListComponent: ngOnInit")
    this.loadStatements();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.paginator.page, this.sort.sortChange)
    .pipe(
      tap(() => this.loadStatements())
    )
    .subscribe();
  }

  delete(id: number) {
    const dialogData = new ConfirmationDialog('Confirm', 'Are you sure you want to delete this statement?');
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '400px',
            closeOnNavigation: true,
            data: dialogData
        })

        dialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
              console.log(`ListComponent: delete(${id})`);
              this.statementService.delete(id).subscribe(() => this.loadStatements());
            }
        });
  }

  private loadStatements() {
    let page = this.paginator?.pageIndex ?? 0;
    let size = this.paginator?.pageSize ?? this.pageSize;
    let column = this.sort?.active ?? "reportDate";
    let dir = this.sort?.direction ?? "desc";
    
    this.statementService.getSummary(page, size, column, dir).subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.statements = data.content;
        this.dataSource = new MatTableDataSource(this.statements);
        this.totalElements = data.totalElements;
        this.pageSize = data.pageSize;
      },
      error => console.log(error)
    );
  }
  
}
