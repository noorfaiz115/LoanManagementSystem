import { Component, OnInit } from '@angular/core';
import { MasterService, EligibilityDto } from '../../shared/services/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BadgeComponent } from '../../shared/components/ui/badge/badge.component';

@Component({
  selector: 'app-eligibility',
  standalone: true,
  imports: [CommonModule, FormsModule, BadgeComponent],
  templateUrl: './eligibility.component.html',
  styleUrl: './eligibility.component.css',
})
export class EligibilityComponent implements OnInit {
  eligibilityRecords: EligibilityDto[] = [];
  customerId: number | null = null;
  loading: boolean = false;

  constructor(private masterService: MasterService) { }

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.loading = true;
    this.masterService.getAllEligibilityRecords().subscribe({
      next: (res) => {
        if (res.success) {
          this.eligibilityRecords = res.data;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading eligibility records", err);
        this.loading = false;
      }
    });
  }

  evaluateEligibility(): void {
    if (!this.customerId) {
      alert("Please enter Customer ID");
      return;
    }
    this.loading = true;
    this.masterService.evaluateEligibility(this.customerId).subscribe({
      next: (res) => {
        if (res.success) {
          alert("Eligibility evaluated successfully");
          this.loadRecords();
        } else {
          alert(res.message);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error("Error evaluating eligibility", err);
        alert("Error evaluating eligibility");
        this.loading = false;
      }
    });
  }

  getBadgeColor(isEligible: boolean): any {
    return isEligible ? 'success' : 'error';
  }
}
