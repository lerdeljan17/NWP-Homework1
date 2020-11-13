import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup
  Uname: string
  constructor(private loginService: LoginService,
              private router: Router,
              private formBuilder: FormBuilder) {
                
    this.loginForm = this.formBuilder.group({
      // Odgovarajuce HTML elemente cemo povezati atributom formControlName="..."
      // ['default value', [validators]
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      number: ['', [Validators.required,Validators.pattern("^[0-9]*$")]]
    })
  }

  ngOnInit(): void {
  }

  public get username(){
    return this.loginForm.get('username')
  }

  public get password(){
    return this.loginForm.get('password')
  }

  public get number(){
    return this.loginForm.get('number')
  }

  public submitForm(credentials){
    this.loginService.login(credentials).subscribe(data => {
      this.router.navigate(['/home'])
    })
    this.Uname = credentials.username
    console.log(this.Uname)
  }
}
