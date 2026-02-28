import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../shared/services/payment.service';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  loanId: number | null = null;
  nextEmi: any = null;
  paymentHistory: any[] = [];

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const decoded = this.authService.getDecodedToken();
    const userId = decoded?.userId || decoded?.UserId || decoded?.sub
      || decoded?.nameid
      || decoded?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

    if (!userId) return;

    this.paymentService.getCustomerByUserId(Number(userId)).subscribe({
      next: (res: any) => {
        const customerId = res.data?.customerId || res.data?.id;
        if (!customerId) return;

        this.paymentService.getLoanByCustomerId(customerId).subscribe({
          next: (loanRes: any) => {
            this.loanId = loanRes.data?.loanId;
            if (!this.loanId) return;

            this.loadNextEmi();
            this.loadPaymentHistory();
          }
        });
      }
    });
  }

  loadNextEmi(): void {
    this.paymentService.getNextEmi(this.loanId!).subscribe({
      next: (res: any) => {
        const list = res.data;
        this.nextEmi = Array.isArray(list) ? list[0] : list;
      }
    });
  }

  loadPaymentHistory(): void {
    this.paymentService.getPaymentsByLoanId(this.loanId!).subscribe({
      next: (res: any) => {
        this.paymentHistory = res.data || [];
      }
    });
  }

  submitPayment(): void {
    if (!this.nextEmi || !this.loanId) return;

    const payload = {
      loanId: this.loanId,
      paymentAmount: this.nextEmi.emiAmount,
      paymentMethod: 0
    };

    this.paymentService.createPayment(payload).subscribe({
      next: (res: any) => {
        this.paymentHistory = [res.data, ...this.paymentHistory];
        this.nextEmi = null;
      }
    });
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

  isOverdue(dateStr: string): boolean {
    return new Date(dateStr) < new Date();
  }

  isDueSoon(dateStr: string): boolean {
    const diff = (new Date(dateStr).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7 && diff >= 0;
  }
}