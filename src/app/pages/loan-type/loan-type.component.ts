import { Component } from "@angular/core";

import { BasicTableFourComponent } from "../../shared/components/tables/basic-tables/basic-table-four/basic-table-four.component";
import { LoanTypeService } from "../../shared/services/loan-type.service";

@Component({
  selector: "app-loan-type",
  imports: [BasicTableFourComponent],
  templateUrl: "./loan-type.component.html",
  styleUrl: "./loan-type.component.css",
})
export class LoanTypeComponent {
  constructor(private loan: LoanTypeService) {
    this.loadAllType();
  }
  loanType: any[] = [];

  loadAllType() {
    return this.loan.GetLoanTypes().subscribe((res) => {
      this.loanType = res.data;
      console.log(this.loanType);
    });
  }
}
