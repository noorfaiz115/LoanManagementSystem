  import { CommonModule } from '@angular/common';
  import { ChangeDetectorRef, Component } from '@angular/core';
  import { APIService } from '../Services/api-service';

  @Component({
    selector: 'app-dashboard',
    imports: [CommonModule,],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
  })
  export class Dashboard {
    constructor(private apiService: APIService,private cdr: ChangeDetectorRef) 
    {

    }
    ngOnInit()
    {
        this.getDashboardData();
    }
    userid:any=localStorage.getItem('User_id');
    // userid:any=localStorage.getItem('user_id');
    getDashboard:any={};
    getDashboardData()
    {
      // let data={userid:this.userid}
      //this.userid
      // userid:any=localStorage.getItem('user_id');
      this.apiService.getWalletAmount(this.userid).subscribe({
        next:(res:any)=>{
            this.getDashboard=res?.data||[];
            this.cdr.detectChanges();
        },
        error:(err)=>{
            console.log(err);
        }
      })
    }

  }
