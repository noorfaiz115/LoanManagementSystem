import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http:HttpClient){}
  url="https://localhost:7137/api/v1/Payment";
  payment(data:any):Observable<any>{
    return this.http.post<any>(this.url,data);
  }

}
