  import { ChangeDetectorRef, Component, NgModule, } from '@angular/core';
  import { APIService } from '../Services/api-service';
  import { FormControl, FormGroup, ReactiveFormsModule, } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { MatCheckboxModule, MatCheckboxChange } from '@angular/material/checkbox';
  import { MatPaginatorModule } from '@angular/material/paginator';
  @Component({
    selector: 'app-crytocurrency',
    imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule,MatPaginatorModule],
    templateUrl: './crytocurrency.html',
    styleUrl: './crytocurrency.scss',
  })
  export class Crytocurrency {
    allcrypt: any[] = [];
    SelectedCoin: any = null;

    constructor(private apiService: APIService, private cdr: ChangeDetectorRef) { }
    ngOnInit() {
      this.getCryptData();
    }
    userid: any = localStorage.getItem('User_id');
    page = 1;
    pageSize = 10;
    totalItems = 0;
    onPageChange(event: any) 
    {
    this.page = event.pageIndex + 1; 
    this.pageSize = event.pageSize;
    this.getCryptData();
    }

    getCryptData() {
      this.apiService.getAllCrypt(this.page, this.pageSize).subscribe({
        next: (res: any) => {
          console.log(res)
          this.allcrypt = (res?.data || []).map((coin: any) => {
            const savedStatus = localStorage.getItem(`fav_${coin.crypto_id}`);
            return { ...coin, isChecked: savedStatus === 'true' };
          });
          this.cdr.detectChanges();
        },
        error: (err) => console.log(err),
      });
    }

    buyCryptoForm = new FormGroup({
      crypto_id: new FormControl(''),
      cryptoPrice: new FormControl(0),
      cryptoQuantity: new FormControl(1),
      orderStatus: new FormControl('success'),
    });


    openBuyModal(coin: any) {
      this.SelectedCoin = coin;
      this.buyCryptoForm.patchValue
        ({
          crypto_id: coin.crypto_id,
          cryptoPrice: coin.current_price,
          cryptoQuantity: 1,
          orderStatus: 'success',
        });
    }

    buyCryptData() {
      console.log("Buy Form Value:", this.buyCryptoForm.value);
      let payload = {
        user_id: this.userid,
        // userid:any=localStorage.getItem('user_id');
        crypto_id: String(this.buyCryptoForm.value.crypto_id),
        cryptoQuantity: Number(this.buyCryptoForm.value.cryptoQuantity),
        cryptoPrice: Number(this.buyCryptoForm.value.cryptoPrice),
        orderStatus: this.buyCryptoForm.value.orderStatus,
      };

      this.apiService.buyCrypto(payload).subscribe({
        next: (res: any) => {
          alert("Buy Order Successful");
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

    sellCryptoForm = new FormGroup({
      crypto_id: new FormControl(''),
      cryptoPrice: new FormControl(0),
      cryptoQuantity: new FormControl(1),
      orderStatus: new FormControl('success'),
    });

    openSellModal(coin: any) {
      this.SelectedCoin = coin;
      this.sellCryptoForm.patchValue
        ({
          crypto_id: coin.crypto_id,
          cryptoPrice: coin.current_price,
          cryptoQuantity: 1,
          orderStatus: 'success',
        });
    }
    userHoldings: any[] = [];
    
    sellCryptData() {
      console.log("sell Form Value:", this.sellCryptoForm.value);
      let payload =
      {
        user_id: this.userid,
        // userid:any=localStorage.getItem('user_id');
        crypto_id: String(this.sellCryptoForm.value.crypto_id),
        cryptoQuantity: Number(this.sellCryptoForm.value.cryptoQuantity),
        cryptoPrice: Number(this.sellCryptoForm.value.cryptoPrice),
        orderStatus: this.sellCryptoForm.value.orderStatus,
      };


      this.apiService.sellCrypto(payload).subscribe({
        next: (res: any) => {
          alert("Sell Order Successful");
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    isChecked: boolean = false;
    changestatus(coin: any, event: MatCheckboxChange) 
    {
      const checkbox = event.checked;
      if (checkbox) {
        // console.log(`${coin.crypto_id} checkbox is checked`);
      
        let payload = {
          "user_id": this.userid,
          "crypto_id": coin.crypto_id
        }
        this.apiService.saveFavCrypt(payload).subscribe({
          next: (res: any) => {
            console.log(res);
            coin.isChecked = true;
            localStorage.setItem(`fav_${coin.crypto_id}`, 'true')
            alert(`${coin.name}Favourite is added`);
            this.cdr.markForCheck();

          },
          error: (err) => {
            console.log(err);
          }
        })
      }
      // console.log(`checkbox is unchecked`);
      // alert(`${coin.crypto_id}Favourite is remove`); 
      else
      {
        let payload = coin.crypto_id;
        // console.log(`checkbox is unchecked`);
        this.apiService.DelFavCrypt(payload).subscribe({
          next: (res: any) => {
            coin.isChecked=false;
            localStorage.setItem(`fav_${coin.crypto_id}`,'false')
            alert(`${coin.crypto_id}Favourite is removedddddddd`);
            this.cdr.markForCheck();
            console.log("removed from favourites",res);
          },
          error: (err) => {
            console.log(err);
          }
        })

      }
    }
    
  }