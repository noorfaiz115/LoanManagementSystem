import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Emi {
  installmentNumber: number;
  dueDate: Date;
  emiAmount: number;
  paymentStatus: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error: any;
}

@Injectable({
  providedIn: "root",
})
export class EmiService {
  private url =
    "https://emischedular-g8hyarczf2evhbdh.canadacentral-01.azurewebsites.net/api/";
  constructor(private http: HttpClient) {}

  getAllEmi(
    loanId: number,
    PaymentStatus: number,
  ): Observable<ApiResponse<Emi[]>> {
    return this.http.get<ApiResponse<Emi[]>>(
      `${this.url}/Emi?loanId=${loanId}&PaymentStatus=${PaymentStatus}`,
    );
  }
}
