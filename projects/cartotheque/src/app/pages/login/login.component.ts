import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LoginCredentials, LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mco-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  loginFormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  private loginService = inject(LoginService);
  private router = inject(Router);

  private loginSubscripton: Subscription | null = null;

  invalidCredentials = false;

  login() {
    this.loginSubscripton = this.loginService
      .login(this.loginFormGroup.value as LoginCredentials)
      .subscribe({
        next: (result) => {
          this.navigateHome();
        },
        error: (error) => {
          this.invalidCredentials = true;
        },
      });
  }

  navigateHome() {
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.loginSubscripton?.unsubscribe();
  }
}
