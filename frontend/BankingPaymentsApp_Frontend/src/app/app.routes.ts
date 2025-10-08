import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ClientRegisterComponent } from './Components/client-register/client-register.component';
import { DocumentUploadComponent } from './Components/document-upload/document-upload.component';
import { BankUserComponent } from './Components/bank-user/bank-user.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { roleGuard } from './Guards/role.guard';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { BankRegisterComponent } from './Components/bank-register/bank-register.component';
import { AdminComponent } from './Components/admin-bankuser/admin-bankuser.component';
import { ListPaymentComponent } from './Components/list-payment/list-payment.component';
import { ClientUserComponent } from './Components/client-user/client-user.component';
import { EmployeeUploadComponent } from './Components/employee-upload/employee-upload.component';
import { ListAllEmployeesComponent } from './Components/list-all-employees/list-all-employees.component';
import { SalaryDisbursementComponent } from './Components/salary-disbursement/salary-disbursement.component';
import { ListSalaryDisbursementComponent } from './Components/list-salary-disbursement/list-salary-disbursement.component';
import { ClientProfileComponent } from './Components/client-profile/client-profile.component';
import { ClientDocumentsComponent } from './Components/client-document/client-document.component';
import { ClientAccountComponent } from './Components/client-account/client-account.component';
import { BeneficiariesComponent } from './Components/beneficiary/beneficiary.component';
import { BeneficiaryRegisterComponent } from './Components/beneficiary-register/beneficiary-register.component';
import { EmployeesComponent } from './Components/employee-list/employee-list.component';
import { ClientTransactionComponent } from './Components/client-transaction/client-transaction.component';
import { ClientPaymentComponent } from './Components/client-payment/client-payment.component';
import { ClientSalaryDisbursementComponent } from './Components/client-salary-disbursement/client-salary-disbursement.component';
import { BeneficiaryComponent } from './Components/Youbraj/beneficiary/beneficiary.component';
import { CreateBeneficiaryComponent } from './Components/Youbraj/create-beneficiary/create-beneficiary.component';
import { EmployeeComponent } from './Components/Youbraj/employee/employee.component';
import { DisbursementComponent } from './Components/Youbraj/disbursement/disbursement.component';
import { DisbursementDetailsComponent } from './Components/Youbraj/disbursement-details/disbursement-details.component';
import { TransactionComponent } from './Components/Youbraj/transaction/transaction.component';
import { HomeComponent } from './Components/Youbraj/home/home.component';
import { ClientHomeComponent } from './Components/client-home/client-home.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { AdminViewBankComponent } from './Components/admin-view-bank/admin-view-bank.component';
import { AdminHomeComponent } from './Components/admin-home/admin-home.component';
import { AdminLogsComponent } from './Components/admin-logs/admin-logs.component';
import { ProfileComponent } from './Components/Youbraj/profile/profile.component';
import { ListClientsComponent } from './Components/Youbraj/list-clients/list-clients.component';
import { ViewDocumentsComponent } from './Components/Youbraj/view-documents/view-documents.component';
import { BankUserHomeComponent } from './Components/Youbraj/bank-user-home/bank-user-home.component';
import { BankUserProfileComponent } from './Components/Youbraj/bank-user-profile/bank-user-profile.component';
import { authGuard } from './Guards/auth.guard';
import { ClientCreateComponent } from './Components/Youbraj/client-create/client-create.component';
import { CallToAction } from './Components/landing-page/call-to-action/call-to-action';
import { BankUserRegisterComponent } from './Components/bank-user-register/bank-user-register.component';
import { MainComponent } from './Components/landing-page/main/main.component';
import { BankuserEditComponent } from './Components/bankuser-edit/bankuser-edit.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';


export const routes: Routes = [

  //   { path: '', redirectTo: 'Landing', pathMatch: 'full' },
  //   { path: "login", component: LoginComponent },
  //   { path: "dashboard", component: DashboardComponent, canActivate: [roleGuard], data: { role: "CLIENT_USER" } },
  //   // { path: 'ClientUser/:id', component: ClientUserComponent },
  //   { path: "beneficiary", component: BeneficiaryComponent, canActivate:[authGuard]},
  //   { path: "beneficiary/create", component: CreateBeneficiaryComponent,canActivate:[authGuard] },
  //   { path: "employee", component: ListAllEmployeesComponent,canActivate:[authGuard] },
  //   { path: "disbursements", component: DisbursementComponent,canActivate:[authGuard]},
  //   { path: "disbursements/:id", component: DisbursementDetailsComponent,canActivate:[authGuard] },
  //   { path: "transactions", component: TransactionComponent,canActivate:[authGuard] },
  //   { path: "home", component: HomeComponent, canActivate: [authGuard], data: { role: "CLIENT_USER" } },
  //   { path: "profile", component: ProfileComponent,canActivate:[authGuard] },
  //   { path: "document/upload", component: DocumentUploadComponent,canActivate:[authGuard] },
  //   { path: "profile/edit", component: ClientProfileComponent,canActivate:[authGuard] },
  //   { path: "clients", component: ListClientsComponent, canActivate:[roleGuard], data:{role: "BANK_USER"}},
  //   { path: "clients/documents/:id", component: ViewDocumentsComponent, canActivate: [roleGuard], data:{role:"BANK_USER"}},
  //   { path: "BankUserHome", component: BankUserHomeComponent,canActivate: [roleGuard], data:{role:"BANK_USER"}},
  //   { path: "BankUserProfile", component: BankUserProfileComponent,canActivate: [roleGuard], data:{role:"BANK_USER"}},
  //   { path: "clientRegister", component: ClientCreateComponent },
  //   { path: "DocumentUpload", component: DocumentUploadComponent },
  //   { path: "bankusers", component: AdminComponent,canActivate: [roleGuard], data:{role:"ADMIN"}},
  //   { path: "logs", component: AdminLogsComponent,canActivate: [roleGuard], data:{role:"ADMIN"}},
  //   { path: "adminHome", component: AdminHomeComponent,canActivate: [roleGuard], data:{role:"ADMIN"}},
  //   { path: "bank", component: BankRegisterComponent,canActivate: [roleGuard], data:{role:"ADMIN"}},
  //   { path: "banks", component: AdminViewBankComponent,canActivate: [roleGuard], data:{role:"ADMIN"}},
  //   { path: "bank/profile/edit", component: BankuserEditComponent,canActivate: [roleGuard], data:{role:"ADMIN"}},
  //   { path: "checkout", component: CheckoutComponent,canActivate: [roleGuard], data:{role:"CLIENT_USER"}},




  //   { path: "Landing", component: MainComponent },
  //   { path: 'BankUserRegistration', component: BankUserRegisterComponent },


  //   { path: "payments", component: ListPaymentComponent, canActivate:[authGuard]},
  //   { path: "payment", component: PaymentComponent, canActivate:[authGuard]},
  //   // { path: "EmployeeUpload", component: EmployeeUploadComponent },
  //   { path: "employees", component: ListAllEmployeesComponent, canActivate:[authGuard]},
  //   // { path: "salary", component: SalaryDisbursementComponent },
  //   // { path: "disbursement", component: SalaryDisbursementComponent,canActivate:[authGuard]},
  //   // { path: "BeneficiaryRegister", component: BeneficiaryRegisterComponent,},
  //   // { path: "disbursement", component: ListSalaryDisbursementComponent },

  //   { path: "**", component: PageNotFoundComponent },
  // ];

  // ---------- PUBLIC ROUTES ----------
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'clientRegister', component: ClientCreateComponent },
  { path: 'BankUserRegistration', component: BankUserRegisterComponent },

  // ---------- CLIENT USER ROUTES ----------
  {
    path: 'client',
    canActivate: [roleGuard],
    data: { role: 'CLIENT_USER' },
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'profile/edit', component: ClientProfileComponent },
      { path: 'document/upload', component: DocumentUploadComponent },
      { path: 'beneficiaries', component: BeneficiaryComponent },
      { path: 'beneficiaries/create', component: CreateBeneficiaryComponent },
      { path: 'transactions', component: TransactionComponent },
      { path: 'disbursements', component: DisbursementComponent },
      { path: 'disbursements/:id', component: DisbursementDetailsComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'payments', component: ListPaymentComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'dashboard', component: DashboardComponent }
    ]
  },

  // ---------- BANK USER ROUTES ----------
  {
    path: 'bank',
    canActivate: [roleGuard],
    data: { role: 'BANK_USER' },
    children: [
      { path: 'home', component: BankUserHomeComponent },
      { path: 'profile', component: BankUserProfileComponent },
      { path: 'clients', component: ListClientsComponent },
      { path: 'clients/documents/:id', component: ViewDocumentsComponent }
    ]
  },

  // ---------- ADMIN ROUTES ----------
  {
    path: 'admin',
    canActivate: [roleGuard],
    data: { role: 'ADMIN' },
    children: [
      { path: 'home', component: AdminHomeComponent },
      { path: 'logs', component: AdminLogsComponent },
      { path: 'banks', component: AdminViewBankComponent },
      { path: 'bankusers', component: AdminComponent },
      { path: 'bank/register', component: BankRegisterComponent },
      { path: 'bank/profile/edit', component: BankuserEditComponent }
    ]
  },

  // ---------- COMMON AUTHENTICATED ROUTES ----------
  {
    path: 'common',
    canActivate: [authGuard],
    children: [
      { path: 'employees', component: ListAllEmployeesComponent },
      { path: 'payments', component: ListPaymentComponent },
      { path: 'payment', component: PaymentComponent }
    ]
  },

  // ---------- FALLBACK ----------
  { path: '**', component: PageNotFoundComponent }
];
