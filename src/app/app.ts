  import { CommonModule } from '@angular/common';
  import { ChangeDetectorRef, Component, signal } from '@angular/core';
  import { FormsModule,FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
  import { RouterLink, RouterOutlet } from '@angular/router';
  import { APIService } from './Services/api-service';
import { ToastrService } from 'ngx-toastr';


  @Component({
    selector: 'app-root',
    imports:[RouterOutlet,RouterLink,CommonModule,FormsModule,ReactiveFormsModule],
    templateUrl: './app.html',
    styleUrl: './app.scss'
  })
  export class App {
    protected readonly title = signal('Bitcoin');
    IsLoggedIn:boolean=false;
    showLoginForm = true;

    constructor(private apiService: APIService,private toastr:ToastrService){}
    loginform=new FormGroup(
    {
      email:new FormControl(),
      password:new FormControl('',[Validators.required,Validators.minLength(4)])
    });

    hideLogin() 
    {
      this.showLoginForm = false;
    }

  logout() {
    localStorage.removeItem('Token');
      localStorage.removeItem('UserName');
      localStorage.removeItem('Email');
      localStorage.removeItem('User_id');
    this.IsLoggedIn = false;
    this.showLoginForm = true;
  }
    get name()
    {
      return this.loginform.controls.email;
    }
    get password()
    {
      return this.loginform.controls.password;
    }
    onSubmit():void
    {
        if(this.loginform.invalid)
        {
          this.loginform.markAllAsTouched();
        }
    }
    sign:any;
    signIn(data:any)
    {
    
        this.apiService.authUser(data).subscribe({
          next:(res:any)=>{
            console.log(res);
            this.sign=res?.data||[];
            localStorage.setItem('Token',res.data.token);
            localStorage.setItem('UserName',res.data.user.userName);              
            localStorage.setItem('Email',res.data.user.email);
            localStorage.setItem('User_id',res.data.user.user_id);
            this.IsLoggedIn=true;
          },
          error:(err)=>{
            console.log(err);
            alert("Invalid Email or password");
            this.toastr.error("Invalid Login & password","Failure Toast");
          }
        })
    }
  }
