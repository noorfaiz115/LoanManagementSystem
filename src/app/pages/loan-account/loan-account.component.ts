import { Component } from "@angular/core";
import {
  LoanAccount,
  LoanAccountService,
} from "../../shared/services/loan-account.service";

import { BasicTableFiveComponent } from "../../shared/components/tables/basic-tables/basic-table-five/basic-table-five.component";

@Component({
  selector: "app-loan-account",
  imports: [BasicTableFiveComponent],
  templateUrl: "./loan-account.component.html",
  styleUrl: "./loan-account.component.css",
})
export class LoanAccountComponent {
  constructor(private loanService: LoanAccountService) {
    this.loadLoanAccounts();
  }
  loans: LoanAccount[] = [];

  loadLoanAccounts() {
    this.loanService.getLoans().subscribe((res) => {
      if (res.success) {
        this.loans = res.data;
        console.log(this.loans);
      }
    });
  }
}
