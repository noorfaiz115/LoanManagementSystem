import { Component } from "@angular/core";

import { BasicTableFourComponent } from "../../shared/components/tables/basic-tables/basic-table-four/basic-table-four.component";
import { LoanTypeService } from "../../shared/services/loan-type.service";
import { FormsModule } from "@angular/forms";
import { InputFieldComponent } from "../../shared/components/form/input/input-field.component";
import { ButtonComponent } from "../../shared/components/ui/button/button.component";
import { LabelComponent } from "../../shared/components/form/label/label.component";

@Component({
  selector: "app-loan-type",
  imports: [
    BasicTableFourComponent,
    FormsModule,
    InputFieldComponent,
    ButtonComponent,
    LabelComponent,
  ],
  templateUrl: "./loan-type.component.html",
  styleUrl: "./loan-type.component.css",
})
export class LoanTypeComponent {
  constructor(private loan: LoanTypeService) {
    this.loadAllType();
  }

  typeLoan: string = "";
  typeIntrest: any = 0;
  loanType: any[] = [];

  loadAllType() {
    return this.loan.GetLoanTypes().subscribe((res) => {
      this.loanType = res.data;
      console.log(this.loanType);
    });
  }

  onSubmit() {
    if (this.typeLoan === "") {
      return alert("Please enter Loan Type ");
    }
    if (this.typeIntrest == 0) {
      return alert("Please enter intrest Rate ");
    }
    this.loan.AddLoanType(this.typeLoan, this.typeIntrest).subscribe((res) => {
      debugger;
      console.log(this.typeIntrest, this.typeLoan);
      this.loadAllType();
      console.log(res.message);
    });
  }
}
