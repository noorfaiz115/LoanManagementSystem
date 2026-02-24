import { Component, OnInit } from "@angular/core";
import { MasterService, CibilReportDto } from "../../shared/services/master.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BadgeComponent } from "../../shared/components/ui/badge/badge.component";

@Component({
  selector: "app-cibil-report",
  standalone: true,
  imports: [CommonModule, FormsModule, BadgeComponent],
  templateUrl: "./cibil-report.component.html",
  styleUrl: "./cibil-report.component.css",
})
export class CibilReportComponent implements OnInit {
  cibilReports: CibilReportDto[] = [];
  customerId: number | null = null;
  panNo: string = "";
  loading: boolean = false;
  message: string = "";

  constructor(private masterService: MasterService) { }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.loading = true;
    this.masterService.getAllCibilReports().subscribe({
      next: (res) => {
        if (res.success) {
          this.cibilReports = res.data;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading CIBIL reports", err);
        this.loading = false;
      }
    });
  }

  checkCibil(): void {
    if (!this.customerId) {
      alert("Please enter Customer ID");
      return;
    }
    this.loading = true;
    this.masterService.checkCibil({ customerId: this.customerId, panNo: this.panNo }).subscribe({
      next: (res) => {
        if (res.success) {
          alert("CIBIL report generated successfully");
          this.loadReports();
        } else {
          alert(res.message);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error("Error checking CIBIL", err);
        alert("Error generating CIBIL report");
        this.loading = false;
      }
    });
  }

  getBadgeColor(status: string): any {
    switch (status.toLowerCase()) {
      case 'success': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'info';
    }
  }
}
