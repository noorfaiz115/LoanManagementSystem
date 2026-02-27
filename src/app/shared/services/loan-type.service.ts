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
    "https://loanorigination-hzh4e6c8c3hfdhde.canadacentral-01.azurewebsites.net/api/LoanType";
  constructor(private http: HttpClient) {}

  GetLoanTypes(): Observable<ApiResponse<LoanType[]>> {
    return this.http.get<ApiResponse<LoanType[]>>(`${this.url}`);
  }

  AddLoanType(
    name: string,
    interest: number,
  ): Observable<ApiResponse<LoanType[]>> {
    const body = {
      loanType_name: name,
      loanType_interest: interest,
    };
    return this.http.post<ApiResponse<LoanType[]>>(this.url, body);
  }
}
