import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FinancialEvent } from '../model/financial-event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, AfterViewInit {
  @Input()
  events: FormArray;
  
  @ViewChild(MatSort)
  sort: MatSort;
  
  displayedColumns: string[] = ['num', 'product','count','price','total','comment','action'];
  dataSource: MatTableDataSource<FinancialEvent> = new MatTableDataSource();
  
  constructor() {}

  ngOnInit(): void {
    this.events.valueChanges.subscribe(
      (events: FinancialEvent[]) => {        
        this.dataSource = new MatTableDataSource(events);        
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getTotal(): string {
    return this.dataSource.data.map(t => t.total * 1).reduce((acc: number, value: number) => { return acc + value;}, 0).toFixed(2);
  }

  deleteEvent(idx: number) {
    this.events.removeAt(idx);
  }
/*
  get product(): FormControl {
    return this.event.controls.product as FormControl;
  }

  get count(): FormControl {
    return this.event.controls.count as FormControl;
  }

  get price(): FormControl {
    return this.event.controls.price as FormControl;
  }

  get total(): FormControl {
    return this.event.controls.total as FormControl;
  }

  get comment(): FormControl {
    return this.event.controls.comment as FormControl;
  }

  removeEvent() {
    this.events.removeAt(this.eventIdx);
  }

  displayProduct(product: Product): string {
    return product && product.name ? product.name : '';
  }
  
  private onCountChange(value: number) {    
    let count = Number(value);
    let price = Number(this.price.value);
    let total = Number(this.total.value);
    if (count && !isNaN(count) && price && !isNaN(price)) {
      this.calculateTotal(count, price)
    }                     
  }

  private calculateTotal(v1: number, v2: number) {
    console.log("calculateTotal: " + v1 + ", " + v2);
    this.total.setValue(Math.round(((v1 * v2) + Number.EPSILON) * 100) / 100);
    
  }

  private calculatePrice(t1: number, v1: number) {
    console.log("calculatePrice: " + t1 + ", " + v1);
    this.price.setValue(t1 / v1);
  }

  private calculateCount(t1: number, v1: number) {
    console.log("calculateCount: " + t1 + ", " + v1);
    this.count.setValue(t1 / v1);
  }
*/  
}
