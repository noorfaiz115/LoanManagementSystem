import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface LoanType {
  loanType_id: number;
  loanType_name: string;
  loanType_interest: number;
  createdAt: Date;
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
export class LoanTypeService {
  private url =
    "https://loanorigination-hzh4e6c8c3hfdhde.canadacentral-01.azurewebsites.net/api/";
  constructor(private http: HttpClient) {}

  GetLoanTypes(): Observable<ApiResponse<LoanType[]>> {
    return this.http.get<ApiResponse<LoanType[]>>(`${this.url}/LoanType`);
  }

  AddLoanType(name: string, intrest: number) {}
}
