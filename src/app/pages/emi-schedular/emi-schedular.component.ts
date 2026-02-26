import { Component } from "@angular/core";
import { Emi, EmiService } from "../../shared/services/emi.service";
import { BasicTableThreeComponent } from "../../shared/components/tables/basic-tables/basic-table-three/basic-table-three.component";
@Component({
  selector: "app-emi-schedular",
  imports: [BasicTableThreeComponent],
  templateUrl: "./emi-schedular.component.html",
  styleUrl: "./emi-schedular.component.css",
})
export class EmiSchedularComponent {
  loanId = 1;
  PaymentStatus = 1;
  constructor(private emi: EmiService) {
    this.loadEmiByLoanId(this.loanId, this.PaymentStatus);
  }
  Emis: Emi[] = [];
  loadEmiByLoanId(loanId: number, PaymentStatus: number) {
    this.emi.getAllEmi(loanId, PaymentStatus).subscribe((res) => {
      this.Emis = res.data;
      console.log(this.Emis);
    });
  }
}
