import { Component } from "@angular/core";
import { LoanTypeComponent } from "../loan-type/loan-type.component";
import { LoanDealComponent } from "../loan-deal/loan-deal.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-loan-origination",
  imports: [RouterModule],
  templateUrl: "./loan-origination.component.html",
  styleUrl: "./loan-origination.component.css",
})
export class LoanOriginationComponent {}
