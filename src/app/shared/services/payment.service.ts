import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({

  providedIn: 'root',
})
export class PaymentService {
  private customerUrl="https://customerservices-c2g4fzd6esajgghv.canadacentral-01.azurewebsites.net/api/Customers";
  private loanAccountUrl="https://loanaccountservicee-cmehdfdndjfnfxcq.canadacentral-01.azurewebsites.net/api/LoanAccount";
  private payUrl = "https://paymentservicee-fbe9c2drenbhekhb.canadacentral-01.azurewebsites.net/api/v1/Payment";
    private emiUrl = "https://emischedular-g8hyarczf2evhbdh.canadacentral-01.azurewebsites.net/api/Emi";

  private http =inject(HttpClient);
getCustomerByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.customerUrl}${userId}`);
  }
getLoanByCustomerId(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.loanAccountUrl}/customer/${customerId}`);
  }
  createPayment(data:any):Observable<any>
  {
    return this.http.post<any>(this.payUrl,data)
  }

  getPaymentsByLoanId(loanId:number):Observable<any>
  {
   return this.http.get<any>(`${this.payUrl}/loan/${loanId}`)
  }
  getNextEmi(loanId:number):Observable<any>
  {
    return this.http.get<any>(`${this.emiUrl}${loanId}/upcoming`)
  }
  
  
}
  



