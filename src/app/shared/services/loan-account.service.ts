import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

export interface LoanAccount {
  loanId: number;
  sanctionNo: string;
  sanctionedAmount: number;
  interestRate: number;
  tenureMonths: number;
  disbursedAmount: number;
  disbursementDate: string;
  outstandingPrincipal: number;
  outstandingInterest: number;
  accountStatus: number;
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
export class LoanAccountService {
  private url = `https://loanaccountservicee-cmehdfdndjfnfxcq.canadacentral-01.azurewebsites.net/api/`;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getLoans(): Observable<ApiResponse<LoanAccount[]>> {
    return this.http.get<ApiResponse<LoanAccount[]>>(this.url + "LoanAccount");
  }
}
