import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Counterparty } from '../model/counterparty';
import { CounterpartyService } from '../service/counterparty.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  form: FormGroup;
  
  constructor(private dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Counterparty,
              private formBuilder: FormBuilder,
              private counterpartyService: CounterpartyService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id:        new FormControl(),
      fullname:  new FormControl('Lidl sp. z o. o.', Validators.required),
      shortname: new FormControl('Lidl (Powstańców)', Validators.required),
      nip:       new FormControl(),
      accountno: new FormControl(),
      address:   this.formBuilder.group({
        country:    new FormControl(),
        city:       new FormControl(),
        street:     new FormControl(),
        postalCode: new FormControl()
      })      
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.counterpartyService.save(this.form.value).subscribe({
      next: (res) => {
        console.log("success: " + JSON.stringify(res));
        this.dialogRef.close(res);
      },
      error: () => console.log("error")
    });
  }
  
}
