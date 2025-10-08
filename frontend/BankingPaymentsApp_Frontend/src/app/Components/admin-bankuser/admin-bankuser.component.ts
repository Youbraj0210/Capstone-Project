import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankRegisterService } from '../../Services/bankUser.service';
import { BankUser } from '../../Models/BankUser';
import { DateFilterComponent } from '../Filters/date-filter/date-filter.component';
import { AmountFilterComponent } from '../Filters/amount-filter/amount-filter.component';
import { AccountNumberFilterComponent } from '../Filters/account-number-filter/account-number-filter.component';
import { IdFilterComponent } from '../Filters/id-filter/id-filter.component';
import { NameFilterComponent } from '../Filters/name-filter/name-filter.component';
import { StatusFilterComponent } from '../Filters/status-filter/status-filter.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RejectDTO } from '../../DTO/RejectDTO';
import { RejectModalComponent } from '../Shared/reject-modal/reject-modal.component';
import { BankService } from '../../Services/bank.service';
import { NotificationService } from '../../Services/notification.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink,CommonModule, RejectModalComponent, DateFilterComponent, AmountFilterComponent, AccountNumberFilterComponent, IdFilterComponent, NameFilterComponent, StatusFilterComponent],
  templateUrl: './admin-bankuser.component.html',
  styleUrls: ['./admin-bankuser.component.css']
})
export class AdminComponent implements OnInit {

  banks: BankUser[] = [];
  processing: Record<number, boolean> = {};
  filters: any = {}
  @ViewChild("rejectModal") formModal!: RejectModalComponent;
  selectedPayment: any = null;
  Banks!: any;
  totalBankUser!: number;
  pending!: number;
  approved!: number;

  // Pagination
  pageNumber = 1;
  pageSize = 10;
  totalRecords = 0;
  totalPages = 0;
  totalPagesArray: number[] = [];

  statusOptions!: { id: number, name: string }[];

  constructor(private bankService: BankRegisterService, private bankSvc: BankService, private notify: NotificationService) { }

  ngOnInit(): void {
    const params = new URLSearchParams(this.filters).toString();
    this.fetchBankUsers(params);
    this.fetchBanks();
  }

  fetchBanks() {
    this.bankSvc.getAllBanks("").subscribe((data) => {
      console.log("Full Data:", data);

      const newArr = data.map(({ bankId, bankName }) => ({
        id: bankId,
        name: bankName
      }));

      console.log("Filtered Data:", newArr);

      this.statusOptions = newArr;
    });
  }

  fetchBankUsers(params: string) {
    this.bankService.getAllBankUsers(params).subscribe((data) => {
      console.log(data);
      this.banks = data;
      this.totalBankUser = data.length;
      this.pending = data.filter(b => b.isActive == false).length;
      this.approved = data.filter(b => b.isActive == true).length;
    },
      (error) => {
        console.log(error);
      })
  }

  approveBankUser(bankUser: BankUser) {
    console.log(bankUser);
    this.bankService.approveBankUser(bankUser.userId, bankUser).subscribe((data) => {
      console.log(data);
      this.notify.success("bankUser sucessfully approved");
      const params = new URLSearchParams(this.filters).toString();
      this.fetchBankUsers(params);
    },
      (error) => {
        console.log(error);
      })
  }

  openFormModal(payment: BankUser) {
    this.selectedPayment = {
      id: payment.userId
    };
    this.formModal.open(payment.userId);
  }

  handleFormSubmit(rejectForm: any) {
    console.log("data in parent=> " + rejectForm)
    this.rejectBankUser(rejectForm);
  }


  rejectBankUser(reject: RejectDTO) {
    this.bankService.rejectBankUser(reject).subscribe((data) => {
      console.log(data);
      this.notify.warning("payment sucessfully Rejected");
    },
      (error) => {
        console.log(error);
      })
  }

  onDateFilter(dates: { dateFrom: string; dateTo: string }) {

    this.filters.joiningFrom = dates.dateFrom;
    this.filters.joiningTo = dates.dateTo;
    console.log(this.filters);

    const params = new URLSearchParams(this.filters).toString();
    this.fetchBankUsers(params);
  }


  onAccountFilter(account: { payeeAccountNumber: string | null }) {
    console.log(this.filters);
    if (account.payeeAccountNumber !== null) {
      this.filters.payeeAccountNumber = account.payeeAccountNumber;
    } else {
      delete this.filters.payeeAccountNumber; 
    }

    const params = new URLSearchParams(this.filters).toString();
    this.fetchBankUsers(params);
  }

  fetchById(value: { id: number }) {
    if (value.id == 0) {
      const params = new URLSearchParams(this.filters).toString();
      this.fetchBankUsers(params);
    }

    this.bankService.getBankUser(value.id).subscribe((data) => {
      console.log(data);
      this.banks = [data];
    },
      (error) => {
        console.log(error);
        this.banks = []
      })
  }

  onNameFilter(name: { payerName: string }) {
    this.filters.fullName = name.payerName;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchBankUsers(params);
  }

  onStatusFilter(status: { paymentStatusId: string }) {
    this.filters.bankId = status.paymentStatusId;

    const params = new URLSearchParams(this.filters).toString();
    this.fetchBankUsers(params);
  }


  downloadPDF(): void {
    if (!this.banks || this.banks.length === 0) {
      this.notify.warning('No bank Users to export!');
      return;
    }

    const doc = new jsPDF();
    doc.text('BankUsers Report', 14, 16);

    const tableColumn = ['#', 'userId', 'Full Name', 'User Name', 'bank', 'isActive', 'branch', 'joiningdate'];
    const tableRows: any[] = [];

    this.banks.forEach((t, i) => {
      tableRows.push([
        i + 1,
        t.userId,
        t.userFullName,
        t.userEmail,
        t.bank.bankName,
        t.isActive,
        t.branch,
        new Date(t.userJoiningDate).toLocaleString()
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save(`Payments_User_${this.banks[0].userId}.pdf`);
  }
}
