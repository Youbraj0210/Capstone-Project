import { ClientUser } from "./ClientUser";
import { SalaryDisbursementDetails } from "./SalaryDisbursementDetails";

export interface Employee {
  employeeId: number;
  clientId: number;
  clientUser?: ClientUser;
  employeeName: string;
  accountNumber: string;
  bankName: string;
  ifsc: string;
  salary: number;
  salaryDisbursementDetails?: Array<SalaryDisbursementDetails>;
}