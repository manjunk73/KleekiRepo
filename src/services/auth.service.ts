import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, User } from '../models/user.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const token = this.getToken();
    if (token) {
      this.loadUserFromToken();
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.currentUserSubject.next({
            id: '',
            username: response.username,
            email: response.email || ''
          });
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  private loadUserFromToken(): void {
    const token = this.getToken();
    if (token) {
      this.http.get<User>(`${environment.apiUrl}/api/auth/user`)
        .subscribe({
          next: (user) => this.currentUserSubject.next(user),
          error: () => this.logout()
        });
    }
  }
}
