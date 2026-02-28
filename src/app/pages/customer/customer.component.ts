import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Customer, CustomerServiceService } from '../../shared/services/customer/customer-service.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {

  customer: Customer[] = [];

  errorMessage: string = '';

  isLoading :boolean= false;

private _searchText = '';
get searchText() { return this._searchText; }
set searchText(val: string) {
  this._searchText = val;
  this.currentPage = 1; // reset to page 1 on every search
}
  // pagination
  currentPage = 1;
  itemsPerPage = 5;

  // sorting
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  private service = inject(CustomerServiceService);

  ngOnInit() {
    this.getAllCustomers();
  }


getAllCustomers() {
      this.isLoading=true;
  this.service.getAllCustomers().subscribe(res => {
    this.customer = res.data;
    this.isLoading=false;
  });
}
  // search
  get filteredData() {
    let data = this.customer;

    if (this.searchText) {
      data = data.filter(c =>
        Object.values(c).some(val =>
          val?.toString().toLowerCase()
            .includes(this.searchText.toLowerCase())
        )
      );
    }

    // SORT
    if (this.sortField) {
      data = [...data].sort((a: any, b: any) => {
        if (a[this.sortField] < b[this.sortField])
          return this.sortDirection === 'asc' ? -1 : 1;
        if (a[this.sortField] > b[this.sortField])
          return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  }

  // PAGINATION
  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(start, start + this.itemsPerPage);
  }

  sort(column: string) {
    if (this.sortField === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = column;
      this.sortDirection = 'asc';
    }
  }

  next() {
    this.currentPage++;
  }

  prev() {
    this.currentPage--;
  }


  DeleteCustomer(id: string) {
  if (confirm('Are you sure?')) {
    this.service.deleteCustomer(id).subscribe({
      next: (res) => {
        this.getAllCustomers();  // reload list
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
}
   
  }

      
    