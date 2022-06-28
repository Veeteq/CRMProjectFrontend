import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { JwtResponse } from '../model/jwt.response';
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
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitted)
    );
  }

  onSubmit() {
    console.log("LoginComponent: onSubmit");
    this.formSubmitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      this.formSubmitted = false;
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.form.value)
    .pipe(first())
    .subscribe(
      (jwtResponse: JwtResponse) => this.handleLoginResponse(jwtResponse),
      err => {
        this.alertService.error(err, false);
        this.error = err
        this.loading = false;
        this.formSubmitted = false;
      }
    );
  }
  
  private handleLoginResponse(jwtResponse: JwtResponse) {
    if (jwtResponse && jwtResponse.token) {
      this.goToRoute();
    }
    this.formSubmitted = false;
  }

  private goToRoute() {
    let map: ParamMap = this.route.snapshot.queryParamMap;
    let returnUrl = map.get('returnUrl') || '/';
    let queryParams: any = {};    

    this.router.navigate([returnUrl], queryParams);    
  }  
}
