import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
  pageSizeOptions:number[] = [20, 50];
  dataSource: MatTableDataSource<Statement> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private authenticationService: AuthenticationService,
              private statementService: StatementService) { }

  ngOnInit(): void {
    console.log("ListComponent: ngOnInit")
    this.loadAllStatements();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id: number) {
    console.log(`ListComponent: delete(${id})`);

    //this.statementervice.delete(id)
    //    .subscribe(() => this.loadAllStatements());
  }

  private loadAllStatements() {
    this.statementService.getAll().subscribe(
      statements => {
        this.statements = statements;
        this.dataSource = new MatTableDataSource(statements);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log(error)
    );
  }
}
