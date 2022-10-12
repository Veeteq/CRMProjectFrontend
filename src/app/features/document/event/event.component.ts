import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input() event: FormGroup;
  @Input() events: FormArray;
  @Input() eventIdx: number;
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void { }

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
    //if (!isNaN(count) && !isNaN(total)) {
    //  this.calculatePrice(total, count)
    //}                
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
}
