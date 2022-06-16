import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formSubmitted: boolean = false;
  returnUrl: string;
  error: string;
  loading: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) { 

    //redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    } 
  }

  ngOnInit(): void {
    console.log("LoginComponent: ngOnInit");
    
    this.form = this.formBuilder.group({
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitted)
    );
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      this.formSubmitted = false;
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.form.value)
    .pipe(first())
    .subscribe(
      response => this.router.navigate([this.returnUrl]),
      err => {
        this.alertService.error(err, false);
        this.error = err
        this.loading = false;
      }
    );
  }  
}
