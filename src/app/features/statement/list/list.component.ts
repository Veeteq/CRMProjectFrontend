import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfirmationDialog } from 'src/app/util/confirmation-dialog/confirmation-dialog';
import { ConfirmationDialogComponent } from 'src/app/util/confirmation-dialog/confirmation-dialog.component';
import { Statement } from '../model/statement';
import { StatementService } from '../service/statement.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  statements: Statement[] = [];
  displayedColumns: string[] = ['num', 'fileName', 'reportDate', 'account', 'action'];
  pageSizeOptions: number[] = [20, 50];
  dataSource: MatTableDataSource<Statement> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private authenticationService: AuthenticationService,
              private statementService: StatementService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log("ListComponent: ngOnInit")
    this.loadAllStatements();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
              this.statementService.delete(id).subscribe(() => this.loadAllStatements());
            }
        });
  }

  private loadAllStatements() {
    this.statementService.getAll().subscribe(
      statements => {
        console.log(JSON.stringify(statements));
        this.statements = statements;
        this.dataSource = new MatTableDataSource(statements);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log(error)
    );
  }
  
}
