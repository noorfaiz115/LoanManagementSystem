import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface EmiDetail {
  scheduleId: number;
  emiAmount: number;
  dueDate: string;
  principalComponent: number;
  interestComponent: number;
  penaltyAmount: number;
  status: string;
}

interface PaymentHistory {
  paymentId: number;
  paymentDate: string;
  paymentAmount: number;
  principalPaid: number;
  interestPaid: number;
  penaltyPaid: number;
  paymentStatus: string;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  loanId: number | null = null;
  isProcessing = false;
  paymentSuccess = false;
  paymentError = '';

  // Next EMI
  nextEmi: EmiDetail | null = null;
  isLoadingEmi = true;

  // Payment History
  paymentHistory: PaymentHistory[] = [];
  isLoadingHistory = true;

  // ---- MOCK DATA ----
  private mockEmi: EmiDetail = {
    scheduleId: 7,
    emiAmount: 15000,
    dueDate: '2026-03-10T00:00:00Z',
    principalComponent: 10200,
    interestComponent: 4800,
    penaltyAmount: 0,
    status: 'Pending'
  };

  private mockHistory: PaymentHistory[] = [
    {
      paymentId: 1,
      paymentDate: '2025-01-10T09:30:00Z',
      paymentAmount: 15000,
      principalPaid: 10200,
      interestPaid: 4800,
      penaltyPaid: 0,
      paymentStatus: 'Success'
    },
    {
      paymentId: 2,
      paymentDate: '2025-02-10T11:00:00Z',
      paymentAmount: 15000,
      principalPaid: 10500,
      interestPaid: 4500,
      penaltyPaid: 0,
      paymentStatus: 'Success'
    },
    {
      paymentId: 3,
      paymentDate: '2025-03-10T10:15:00Z',
      paymentAmount: 20000,
      principalPaid: 10800,
      interestPaid: 4200,
      penaltyPaid: 0,
      paymentStatus: 'Success'
    }
  ];

  ngOnInit(): void {
    // ---- localStorage se LoanId lo ----
    const stored = localStorage.getItem('loanId');
    this.loanId = stored ? Number(stored) : 101; // fallback 101 for demo

    this.loadNextEmi();
    this.loadPaymentHistory();
  }

  loadNextEmi(): void {
    this.isLoadingEmi = true;
    // TODO: Replace with real API call:
    // this.http.get<any>(`BASE_URL/api/v1/EmiSchedule/next/${this.loanId}`)
    setTimeout(() => {
      this.nextEmi = this.mockEmi;
      this.isLoadingEmi = false;
    }, 800);
  }

  loadPaymentHistory(): void {
    this.isLoadingHistory = true;
    // TODO: Replace with real API call:
    // this.http.get<any>(`BASE_URL/api/v1/Payment/loan/${this.loanId}`)
    setTimeout(() => {
      this.paymentHistory = this.mockHistory;
      this.isLoadingHistory = false;
    }, 1000);
  }

  submitPayment(): void {
    if (!this.nextEmi || this.isProcessing) return;
    this.isProcessing = true;
    this.paymentSuccess = false;
    this.paymentError = '';

    // TODO: Replace with real API call:
    // this.http.post(`BASE_URL/api/v1/Payment`, { loanId: this.loanId, paymentAmount: this.nextEmi.emiAmount })
    setTimeout(() => {
      // Simulate success
      const newPayment: PaymentHistory = {
        paymentId: this.paymentHistory.length + 1,
        paymentDate: new Date().toISOString(),
        paymentAmount: this.nextEmi!.emiAmount,
        principalPaid: this.nextEmi!.principalComponent,
        interestPaid: this.nextEmi!.interestComponent,
        penaltyPaid: this.nextEmi!.penaltyAmount,
        paymentStatus: 'Success'
      };
      this.paymentHistory = [newPayment, ...this.paymentHistory];
      this.isProcessing = false;
      this.paymentSuccess = true;
      this.nextEmi = null; // EMI paid, no pending EMI
    }, 1500);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 2
    }).format(amount);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  }

  isDueSoon(dateStr: string): boolean {
    const due = new Date(dateStr);
    const today = new Date();
    const diff = (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7 && diff >= 0;
  }

  isOverdue(dateStr: string): boolean {
    return new Date(dateStr) < new Date();
  }
}