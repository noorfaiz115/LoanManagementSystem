import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormGroup, FormControl, Validators } from "@angular/forms";
import { APIService } from '../Services/api-service';
import { validate } from '@angular/forms/signals';
@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  constructor(private apiService:APIService,private cdr:ChangeDetectorRef)
  {
 
  }
  ngOnInit()
  {
      this.registerform;
      this.cdr.detectChanges();
  }
  registerform=new FormGroup({
    userName: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    email: new FormControl(),
    password: new FormControl('',[Validators.required,Validators.minLength(4)])
  })  
  get userName()
  {
     return this.registerform.controls.userName;
  }
  get password()
  {
    return this.registerform.controls.password;

  }
  register:any; 
  registerData(data:any)
  {
    console.log(data);
    this.apiService.registerUser(data).subscribe(
      {
        next:(res:any)=>{
          console.log(res);
          this.register=res?.data||[]
          alert("User register succesfully");
          this.registerform.reset();
          this.cdr.detectChanges();
        },
        error:(err)=>
        {
          console.log(err);
        }
      }
    );
  }
}

