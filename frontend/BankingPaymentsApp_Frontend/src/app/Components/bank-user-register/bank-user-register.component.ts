import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BankRegisterService } from '../../Services/bankUser.service';
import { Bank } from '../../Models/Bank';
import { BankService } from '../../Services/bank.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-bank-user-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './bank-user-register.component.html',
  styleUrls: ['./bank-user-register.component.css']
})
export class BankUserRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  banks: Bank[] = [];

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;




  constructor(
    private fb: FormBuilder,
    private bankUserService: BankRegisterService,
    private bankService: BankService,
    private router:Router,
    private notify: NotificationService 
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        userFullName: ['', Validators.required],
        userName: ['', Validators.required],
        userEmail: ['', [Validators.required, Validators.email]],
        userPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        userRoleId: [2], // default role
        bankId: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
          ]
        ],
        confirmPassword: ['', Validators.required],
        refferalCode: ['', Validators.required],
        branch: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );

    this.loadBanks();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // custom validator
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  loadBanks() {
    this.bankService.getAllBanks("").subscribe({
      next: (res) => (this.banks = res),
      error: (err) => console.error('Error fetching banks:', err)
    });
  }

  backendEmailError: string | null = null;
backendPhoneError: string | null = null;

register() {
  if (this.registerForm.invalid) return;

  const bankUser = this.registerForm.value;

  this.backendEmailError = null;
  this.backendPhoneError = null;

  this.bankUserService.registerBankUser(bankUser).subscribe({
    next: () => {
      this.notify.success('Bank User registered successfully!');
      this.registerForm.reset();
      this.router.navigate(["/login"]);
    },
    error: (err) => {
      console.error(err);

      if (err.error && typeof err.error === 'string') {
        if (err.error.includes('email')) {
          this.backendEmailError = err.error;
        } else if (err.error.includes('phone')) {
          this.backendPhoneError = err.error;
        } else {
          this.notify.error(err.error); 
        }
      } else {
        this.notify.error('Registration failed!');
      }
    }
  });
}

}
