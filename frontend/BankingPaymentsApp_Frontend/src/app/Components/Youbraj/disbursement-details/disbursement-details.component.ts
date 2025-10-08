import { Component, OnInit } from '@angular/core';
import { SalaryDisbursement } from '../../../Models/SalaryDisbursement';
import { SalaryDisbursementService } from '../../../Services/salary-disbursement.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaymentStatusPipe } from '../../../Pipes/payment-status.pipe';
import { NotificationService } from '../../../Services/notification.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-disbursement-details',
  imports: [CommonModule, PaymentStatusPipe, RouterLink],
  templateUrl: './disbursement-details.component.html',
  styleUrl: './disbursement-details.component.css',
  standalone: true
})
export class DisbursementDetailsComponent implements OnInit {
  disbursement!: SalaryDisbursement;
  role!:string|null; 

  constructor(private route: ActivatedRoute, private notify: NotificationService , private disbursementSvc: SalaryDisbursementService,private auth:AuthService) { }

  ngOnInit(): void {
    this.role = this.auth.getUserRole();
    let disbursementId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchDisbursementById(disbursementId);
  }

  fetchDisbursementById(id: number) {
    this.disbursementSvc.getSalaryDisbursementById(id).subscribe((data) => {
      console.log(data);
      this.disbursement = data;
    },
      (error) => {
        console.log(error);
      })
  }


}
