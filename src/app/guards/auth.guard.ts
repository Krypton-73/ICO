import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('currentUser')) {
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }
}
