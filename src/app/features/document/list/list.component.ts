import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DocumentSummary } from '../model/document-summary';
import { DocumentService } from '../service/document.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  dcouments: DocumentSummary[] = [];
  displayedColumns: string[] = ['num', 'documentDate', 'documentType', 'name', 'counterparty', 'account', 'paymentMethod', 'documentBalance', 'action'];
  pageSize: number = 25;
  pageSizeOptions: number[] = [25, 50];
  totalElements: number;
  dataSource: MatTableDataSource<DocumentSummary> = new MatTableDataSource();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;
  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.loadDocuments();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.paginator.page, this.sort.sortChange)
    .pipe(
      tap(() => this.loadDocuments())
    )
    .subscribe();
  }

  delete(id: number) {
    console.log("Delete document with id: " + id);
  }

  private loadDocuments() {
    const page = this.paginator?.pageIndex ?? 0;
    const size = this.paginator?.pageSize ?? this.pageSize;
    const column = this.sort?.active ?? "documentDate";
    const dir = this.sort?.direction ?? "desc";

    this.documentService.getSummary(page, size, column, dir).subscribe(
      data => {
        this.dcouments = data.content;
        this.dataSource = new MatTableDataSource(this.dcouments);
        this.totalElements = data.totalElements;
        this.pageSize = data.pageSize;
      },
      error => console.log(error)
    );
  }
}
