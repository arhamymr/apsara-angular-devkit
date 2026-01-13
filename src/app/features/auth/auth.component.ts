import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { AuthService } from './services/auth.service';

type AuthMode = 'login' | 'register';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  template: `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <div class="logo-badge">
              <span>Lock</span>
            </div>
            <h1 class="auth-title">{{ isRegister() ? 'Create Account' : 'Welcome Back' }}</h1>
            <p class="auth-subtitle">
              {{ isRegister() ? 'Sign up to get started' : 'Sign in to your account' }}
            </p>
          </div>

          @if (error()) {
            <div class="error-alert">
              <span>{{ error() }}</span>
              <button class="close-btn" (click)="clearError()">Close</button>
            </div>
          }

          <form [formGroup]="authForm" (ngSubmit)="onSubmit()" class="auth-form">
            @if (isRegister()) {
              <div class="form-group">
                <label for="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  formControlName="name"
                  placeholder="Enter your full name"
                  [class.invalid]="getFieldError('name')">
                @if (getFieldError('name')) {
                  <span class="error-text">{{ getFieldError('name') }}</span>
                }
              </div>
            }

            <div class="form-group">
              <label for="email">Email Address</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                placeholder="Enter your email"
                [class.invalid]="getFieldError('email')">
              @if (getFieldError('email')) {
                <span class="error-text">{{ getFieldError('email') }}</span>
              }
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input
                id="password"
                [type]="showPassword() ? 'text' : 'password'"
                formControlName="password"
                placeholder="{{ isRegister() ? 'Create a password' : 'Enter your password' }}"
                [class.invalid]="getFieldError('password')">
              @if (getFieldError('password')) {
                <span class="error-text">{{ getFieldError('password') }}</span>
              }
            </div>

            @if (isRegister()) {
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  formControlName="confirmPassword"
                  placeholder="Confirm your password"
                  [class.invalid]="getFieldError('confirmPassword')">
                @if (getFieldError('confirmPassword')) {
                  <span class="error-text">{{ getFieldError('confirmPassword') }}</span>
                }
              </div>
            }

            @if (!isRegister()) {
              <div class="forgot-password">
                <a href="javascript:void(0)" (click)="onForgotPassword()">Forgot password?</a>
              </div>
            }

            <div class="form-actions">
              <app-button
                [label]="isRegister() ? 'Create Account' : 'Sign In'"
                [fullWidth]="true"
                [loading]="loading()"
                [disabled]="!authForm.valid"
                (clicked)="onSubmit()" />
            </div>
          </form>

          <div class="auth-divider">
            <span>or continue with</span>
          </div>

          <div class="social-buttons">
            <app-button
              variant="outlined"
              label="Google"
              [fullWidth]="true"
              (clicked)="onSocialLogin('google')" />
            <app-button
              variant="outlined"
              label="GitHub"
              [fullWidth]="true"
              (clicked)="onSocialLogin('github')" />
          </div>

          <div class="auth-footer">
            @if (isRegister()) {
              <span>Already have an account?</span>
              <a href="javascript:void(0)" (click)="toggleMode()">Sign in</a>
            } @else {
              <span>Don't have an account?</span>
              <a href="javascript:void(0)" (click)="toggleMode()">Create one</a>
            }
          </div>
        </div>

        <div class="demo-credentials">
          <p><strong>Demo:</strong> demo&#64;example.com / password123</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: calc(100vh - 64px);
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f7fa;
      padding: 24px;
    }

    .auth-container {
      width: 100%;
      max-width: 440px;
    }

    .auth-card {
      background: white;
      border-radius: 16px;
      padding: 40px 32px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    }

    .auth-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .logo-badge {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      font-size: 24px;
      color: white;
      font-weight: bold;
    }

    .auth-title {
      font-size: 26px;
      font-weight: 600;
      color: #1c1b1f;
      margin: 0 0 8px;
    }

    .auth-subtitle {
      font-size: 14px;
      color: #616161;
      margin: 0;
    }

    .error-alert {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      background: rgba(244, 67, 54, 0.1);
      border: 1px solid rgba(244, 67, 54, 0.2);
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 24px;
      color: #f44336;
      font-size: 14px;
    }

    .close-btn {
      background: none;
      border: none;
      color: #f44336;
      cursor: pointer;
      font-size: 14px;
    }

    .auth-form {
      margin-bottom: 24px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #49454f;
      margin-bottom: 6px;
    }

    .form-group input {
      width: 100%;
      padding: 12px 16px;
      border: 1.5px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.2s, box-shadow 0.2s;
      box-sizing: border-box;
    }

    .form-group input:focus {
      outline: none;
      border-color: #1976d2;
      box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
    }

    .form-group input.invalid {
      border-color: #f44336;
    }

    .error-text {
      display: block;
      font-size: 12px;
      color: #f44336;
      margin-top: 4px;
    }

    .forgot-password {
      text-align: right;
      margin-bottom: 24px;
    }

    .forgot-password a {
      color: #1976d2;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
    }

    .forgot-password a:hover {
      text-decoration: underline;
    }

    .form-actions {
      margin-top: 8px;
    }

    .auth-divider {
      display: flex;
      align-items: center;
      gap: 16px;
      margin: 24px 0;
    }

    .auth-divider::before,
    .auth-divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #e0e0e0;
    }

    .auth-divider span {
      font-size: 13px;
      color: #757575;
      white-space: nowrap;
    }

    .social-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 24px;
    }

    .auth-footer {
      text-align: center;
      font-size: 14px;
      color: #616161;
    }

    .auth-footer a {
      color: #1976d2;
      text-decoration: none;
      font-weight: 500;
      margin-left: 4px;
    }

    .auth-footer a:hover {
      text-decoration: underline;
    }

    .demo-credentials {
      margin-top: 24px;
      text-align: center;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 8px;
      font-size: 13px;
      color: #616161;
    }

    .demo-credentials strong {
      color: #1c1b1f;
    }

    @media (max-width: 480px) {
      .auth-card {
        padding: 32px 24px;
      }

      .social-buttons {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AuthComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly loading = this.authService.loading;
  readonly error = this.authService.error;
  readonly showPassword = signal(false);
  private readonly _isRegister = signal(false);

  readonly isRegister = computed(() => this._isRegister());

  authForm: FormGroup;

  constructor() {
    this.authForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    });
  }

  toggleMode(): void {
    this._isRegister.update(v => !v);
    this.authService.clearError();
    this.authForm = this.buildForm();
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  getFieldError(fieldName: string): string {
    const field = this.authForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${requiredLength} characters`;
      }
    }
    return '';
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      const { name, email, password, confirmPassword } = this.authForm.value;

      if (this.isRegister()) {
        if (password !== confirmPassword) {
          this.authForm.get('confirmPassword')?.setErrors({ mismatch: true });
          return;
        }
        this.authService.register({ name, email, password, confirmPassword });
      } else {
        this.authService.login({ email, password });
      }
    } else {
      Object.keys(this.authForm.controls).forEach(key => {
        this.authForm.get(key)?.markAsTouched();
      });
    }
  }

  onForgotPassword(): void {
    this.router.navigate(['/auth/forgot-password']);
  }

  onSocialLogin(provider: string): void {
    console.log(`Social login with ${provider}`);
  }

  clearError(): void {
    this.authService.clearError();
  }
}
