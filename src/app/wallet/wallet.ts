import { ChangeDetectorRef, Component } from '@angular/core';
import { APIService } from '../Services/api-service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-wallet',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './wallet.html',
  styleUrl: './wallet.scss',
})
export class Wallet {
  constructor(private apiService: APIService,private cdr: ChangeDetectorRef) 
  {
      

  }
  ngOnInit()
  {
        this.getWalletData();
        this.getWalletAmountData();
        this.cdr.detectChanges();
  }
 userid:any=localStorage.getItem('User_id');
  withdrawForm=new FormGroup( {
    walletTransaction_amount:new FormControl(0,Validators.required),
    walletTransaction_paymentType: new FormControl(),
    walletTransaction_payNote: new FormControl(),
    walletTransaction_status: new FormControl(),
  })
  DepositeForm=new FormGroup({
    walletTransaction_amount: new FormControl(0,Validators.required),
    walletTransaction_paymentType: new FormControl(),
    walletTransaction_payNote: new FormControl(), 
    walletTransaction_status: new FormControl(),
  })
  getwallet:any;
  getWalletData()
  {
   
    //here also instead of 1 pass dynamic user id
    this.apiService.getWalletData(this.userid).subscribe({
      next:(res:any)=>{
        this.getwallet=res?.data||[];
        this.cdr.markForCheck();
      },
      error:(err)=>{
          console.log(err);
      }
    })
  }

  getwalletamount:any;
  getWalletAmountData()
  {
    // userid:any=localStorage.getItem('user_id');
    this.apiService.getWalletAmount(this.userid).subscribe({
      next:(res:any)=>{
          this.getwalletamount=res?.data||[];
          this.cdr.markForCheck();
      },
      error:(err)=>{
          console.log(err);
      }
    })
  }
   
  withdrawAmountData()
  {
    const withdrawamt=Number(this.withdrawForm.value.walletTransaction_amount);
    const currentbal=Number(this.getwalletamount?.walletBalance || 0);
    if (withdrawamt > currentbal) 
    {
      alert("Insufficient balance! Withdraw amount is greater than wallet balance.");
      return;
    }
    let data = {
    user_id: this.userid,
    walletTransaction_amount: Number(this.withdrawForm.value.walletTransaction_amount),
    walletTransaction_paymentType: this.withdrawForm.value.walletTransaction_paymentType,
    walletTransaction_payNote: this.withdrawForm.value.walletTransaction_payNote,
    walletTransaction_status: 'success'
  };
    
    //dynamic user id set
    // data.user_id=18;
    console.log(data);
    this.apiService.withdrawAmount(data).subscribe({
      next:(res:any)=>{
            // userid:any=localStorage.getItem('user_id');
         alert("Withdraw Successful");
         this.withdrawForm.reset();
         this.getWalletAmountData();
         this.getWalletData();
         this.cdr.detectChanges();
        //  this.getWalletAmountData();
      },  
      error:(err)=>{
        console.log(err);
      }
    })
  }
 
  depositAmountData()
  {
    let data = {
    user_id: this.userid,
    walletTransaction_amount: Number(this.DepositeForm.value.walletTransaction_amount),
    walletTransaction_paymentType: this.DepositeForm.value.walletTransaction_paymentType,
    walletTransaction_payNote: this.DepositeForm.value.walletTransaction_payNote,
    walletTransaction_status: 'success'
  };
    // data.user_id=18;
    // userid:any=localStorage.getItem('user_id');
    //dynamic user id set
    console.log(data);
    this.apiService.depositAmount(data).subscribe({
      next:(res:any)=>{
         alert("Deposit Successful");
         this.DepositeForm.reset();
         this.getWalletAmountData();
         this.getWalletData();
         this.cdr.detectChanges();
        //  this.getWalletAmountData();
     
      },
      error:(err)=>{
        console.log(err.error);
      }
    })
  }

}
