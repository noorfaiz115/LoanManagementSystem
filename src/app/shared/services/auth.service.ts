import { Injectable, inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  // private router = inject(Router);
  // private apiUrl = `${environment.apiUrl}/Auth/`;
  private apiUrl = `https://localhost:7215/api/Auth`;
  constructor(private router: Router) {}

  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response.success && response.data?.token) {
          this.setToken(response.data.token);
        }
      }),
    );
  }

  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("token", token);
    }
  }
  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem("token");
  }

  clearToken() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("token");
    }
  }
  getDecodedToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }
  getUserRole(): string | null {
    const decoded = this.getDecodedToken();
    if (!decoded) return null;

    return decoded[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  }

  isTokenExpired(): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded?.exp) return true;

    const expiryTime = decoded.exp * 1000;
    return Date.now() > expiryTime;
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  logout() {
    this.clearToken();
    debugger;
    this.router.navigate(["/signin"]);
  }
}
