import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(): boolean {
    if (this.isLoggedIn()){
      console.log("isLogged " + "token: " + this.getToken() + " " + this.isLoggedIn())
      return true
    }else{
      console.log("isLogged " + "token: " + this.getToken() + " " + this.isLoggedIn())
      window.location.href = 'https://localhost:7104/Auth/Login'
      return false
    }
  }

  isLoggedIn() : boolean{
    const token = this.getToken();
    return token !== '';
  }

  getToken(): string {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'AccessToken') {
        return value;
      }
    }
    return '';
  }
  
}
