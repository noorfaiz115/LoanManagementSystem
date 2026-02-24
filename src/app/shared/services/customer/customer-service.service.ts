import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../Interfaces/api-responce';
 export interface Customer {
  "customerId": string,
      "userId": number,
      "mobile": string,
      "aadhar": string,
      "pan": string,
      "dob": string,
      "age": number,
      "gender": string,
      "employmentType": string,
      "monthlyIncome": number,
      "status": string,
      "createdAt": string,
      "modifiedAt": string | null;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceService {
  
  private baseUrl = 'https://localhost:7144/api/Customers';
  
  private http =inject(HttpClient);

  private headers= new HttpHeaders({
    'Content-Type': 'application/json'
  });

  public getAllCustomers() :Observable<ApiResponse<Customer[]>> {
    return this.http.get<ApiResponse<Customer[]>>(this.baseUrl); //, { headers: this.headers });

}


public deleteCustomer(id:string):Observable<ApiResponse<Customer[]>>{
  return this.http.delete<ApiResponse<Customer[]>>(`${this.baseUrl}/${id}`)
}
}