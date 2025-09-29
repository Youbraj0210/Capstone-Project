import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { User } from '../../../Models/User';
import { AuthService } from '../../../Services/auth.service';
import { ClientRegisterService } from '../../../Services/client.service';
import { ClientUser } from '../../../Models/ClientUser';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../Services/payment.service';
import { Payment } from '../../../Models/Payment';
import { BankRegisterService } from '../../../Services/bankUser.service';

@Component({
  selector: 'app-bank-user-home',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './bank-user-home.component.html',
  styleUrl: './bank-user-home.component.css'
})
export class BankUserHomeComponent implements OnInit {
  user!: any;
  clients: any[] = [];
  payments: Payment[] = [];
  totalClients!: number;
  totalPayments!: number;
  userId!: number;

  constructor(
    private auth: AuthService,
    private bankUserSvc: BankRegisterService,
    private clientSvc: ClientRegisterService,
    private paymentSvc: PaymentService
  ) { }

  ngOnInit(): void {
    this.userId = this.auth.getUserId() ?? 0;
    this.fetchBankUser(this.userId);
  }

  fetchBankUser(id: number) {
    this.bankUserSvc.getBankUser(id).subscribe((data) => {
      this.user = data;
      console.log('Bank User:', data);

      this.fetchAllClients();
      this.fetchAllPayments();
    }, (error) => {
      console.error(error);
    });
  }

  fetchAllClients() {
    this.clientSvc.getClients('').subscribe((data) => {
      this.clients = data.filter(d => d.bankUserId == this.userId);
      this.totalClients = this.clients.length;

      // Setup charts related to clients
      this.setupClientsChart();
      this.setupClientGrowthChart();
      this.setupBranchChart();
    }, (error) => {
      console.error(error);
    });
  }

  fetchAllPayments() {
    this.paymentSvc.getAllPayments('').subscribe((data) => {
      this.payments = data // filter by bank user if needed
      this.totalPayments = this.payments.length;

      // Setup charts related to payments
      this.setupPaymentsChart();
    }, (error) => {
      console.error(error);
    });
  }

  /** ----------------- Charts ----------------- **/

  public chartOptions: ChartOptions<'doughnut' | 'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false, // allows canvas to fit the container
    plugins: {
      legend: {
        position: 'top', // or 'bottom'
        labels: {
          boxWidth: 12,
          padding: 10
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    layout: {
      padding: 20 // optional, adds space inside the chart
    },
    scales: {
      x: { display: true },
      y: { display: true }
    }
  };

  /** 1. Clients by Status (Active vs Inactive) */
  clientsChartData!: ChartData<'doughnut'>;
  clientsChartType: 'doughnut' = 'doughnut';

  /** 2. Payments Overview (Approved, Declined, Pending) */
  paymentsChartData!: ChartData<'doughnut'>;
  paymentsChartType: 'doughnut' = 'doughnut';

  /** 3. Client Growth (Line Chart over time) */
  clientGrowthData!: ChartData<'line'>;

  /** 4. Branch-Wise Clients (Bar Chart) */
  branchChartData!: ChartData<'bar'>;
  branchChartType: 'bar' = 'bar';

  /** ------------------- Chart Setup Methods ------------------- **/

  setupClientsChart() {
    const active = this.clients.filter(c => c.isActive).length;
    const inactive = this.clients.length - active;

    this.clientsChartData = {
      labels: ['Active', 'Inactive'],
      datasets: [{
        data: [active, inactive],
        backgroundColor: ['#4caf50', '#f44336']
      }]
    };
  }

  setupPaymentsChart() {
    const approved = this.payments.filter(p => p.paymentStatusId === 1).length;
    const declined = this.payments.filter(p => p.paymentStatusId === 2).length;
    const pending = this.payments.filter(p => p.paymentStatusId === 3).length;

    this.paymentsChartData = {
      labels: ['Approved', 'Declined', 'Pending'],
      datasets: [{
        data: [approved, declined, pending],
        backgroundColor: ['#7a5af8', '#ff9800', '#2196f3']
      }]
    };
  }

  setupClientGrowthChart() {
    // Example: Count clients per month
    const monthMap: any = {};
    this.clients.forEach(c => {
      const month = new Date(c.createdAt).toLocaleString('default', { month: 'short' });
      monthMap[month] = (monthMap[month] || 0) + 1;
    });

    this.clientGrowthData = {
      labels: Object.keys(monthMap),
      datasets: [{
        label: 'New Clients',
        data: Object.values(monthMap),
        borderColor: '#7a5af8',
        backgroundColor: 'rgba(122, 90, 248, 0.2)',
        fill: true,
        tension: 0.3
      }]
    };
  }

  setupBranchChart() {
    // Example: Count clients per branch
    const branchMap: any = {};
    this.clients.forEach(c => {
      const branch = c.branchName ?? 'Unknown';
      branchMap[branch] = (branchMap[branch] || 0) + 1;
    });

    this.branchChartData = {
      labels: Object.keys(branchMap),
      datasets: [{
        label: 'Clients per Branch',
        data: Object.values(branchMap),
        backgroundColor: '#4fd0e7'
      }]
    };
  }
}
