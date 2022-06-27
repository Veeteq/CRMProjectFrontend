import { Component, Input, OnInit } from '@angular/core';
import { StatementDetail } from '../model/statement-detail';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() details: StatementDetail[];
  displayedColumns: string[] = ['detail-nr', 'detail-date', 'detail-title', 'detail-amount'];
  
  constructor() { }

  ngOnInit(): void {
  }

}
