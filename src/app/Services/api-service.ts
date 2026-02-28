import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient)
  {

  }
  //addfav
  favurl="https://localhost:7194/api/v1/Favourite/AddFav"
  saveFavCrypt(data:any)
  {
    return this.http.post(this.favurl,data);
  }
  //Fav
  Userurl="https://localhost:7194/api/v1/Favourite/FetchFavUser/";
  getFavCrypt(data:any)
  {
    return this.http.get(this.Userurl+data);
  }

  UserurlDel="https://localhost:7194/api/v1/Favourite/Delete/";
  DelFavCrypt(data:any)
  {
    return this.http.delete(this.UserurlDel+data);
  }
 //crypto
 CryptoUrl1="https://localhost:7194/api/v1/Cryptocurrency";
  getAllCrypt1()
  {
    return this.http.get(this.CryptoUrl1);
  }
  CryptoUrl="https://localhost:7194/api/v1/Cryptocurrency";
  getAllCrypt(page:number,pageSize:number)
  {
    return this.http.get(`${this.CryptoUrl}?page=${page}&pagesize=${pageSize}`);
  }
  //wallet transaction by id
  getwalletdataurl="https://localhost:7194/api/v1/Wallettransaction/wallettrans/{user_id}";
  getWalletData(data:any)
  {
    return this.http.get(this.getwalletdataurl.replace("{user_id}", data));
  }

  //deposite
  depositurl="https://localhost:7194/api/v1/Wallet/deposite";
  depositAmount(data:any)
  {
    return this.http.post(this.depositurl,data);
  }


  //withdraw
  withdrawurl="https://localhost:7194/api/v1/Wallet/Withdraw";
   withdrawAmount(data:any)
  {
    return this.http.post(this.withdrawurl,data);
  }
   //here i getting total wallet amount using dashboard
  getWalleturl="https://localhost:7194/api/DashBoard/{userId}";
  getWalletAmount(data:any)
  {
    return this.http.get(this.getWalleturl.replace("{userId}", data));
  }

  //buy crypto
  buyCryptoUrl="https://localhost:7194/api/v1/Order/Buying";
  buyCrypto(data:any)
  {
    return this.http.post(this.buyCryptoUrl,data);
  }
  //sell crypto
  sellCryptoUrl="https://localhost:7194/api/v1/Order/Selling"
  sellCrypto(data:any)
  {
    return this.http.post(this.sellCryptoUrl,data);
  }
  
  //register user
  registeruserurl="https://localhost:7194/api/v1/Auth/Register"
  registerUser(data:any)
  {
    return this.http.post(this.registeruserurl,data);
  }

  //auth user
  authuserurl="https://localhost:7194/api/v1/Auth"
  authUser(data:any)
  {
    return this.http.post(this.authuserurl,data);
  }
}
