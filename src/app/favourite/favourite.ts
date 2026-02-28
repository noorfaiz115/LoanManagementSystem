import { ChangeDetectorRef, Component } from '@angular/core';
import { APIService } from '../Services/api-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-favourite',
  imports: [CommonModule],
  templateUrl: './favourite.html',
  styleUrl: './favourite.scss',
})
export class Favourite {
   constructor(private apiService:APIService,private cdr: ChangeDetectorRef)
   { 
     
   }
   userid:any=localStorage.getItem('User_id');
   ngOnInit()
   {
       this.getFav();
       this.cryptPrice();
   }
   allFav:any;
   getFav()
   {
      console.log(this.userid)
            //  console.log(this.allFav.crypto_id);
            //  console.log(this.getcryptprice.crypto_id);
      this.apiService.getFavCrypt(this.userid).subscribe({
          next:(res:any)=>{
             console.log(res);
            //  if(this.allFav.crypto_id==this.getcryptprice.crypto_id)
            //  {
            //     this.allFav.cryptPrice=this.getcryptprice.current_price
            //  }
             //this.getcryptprice.crypto_id=this.allFav.crypto_id
            //this.allFav.cryptPrice= this.getcryptprice.current_price
                this.allFav=res?.data||[];
                this.cdr.detectChanges();
          },
          error:(err)=>{
              console.log(err);
          }
      })
   }
   getcryptprice:any;
   cryptPrice()
   {
      this.apiService.getAllCrypt1().subscribe({
        next:(res:any)=>{
            this.getcryptprice=res?.data||[]
        },
        error:(err)=>{
            console.log(err);
        }
      })
   }
}
