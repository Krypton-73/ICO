import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedIn implements CanActivate {

  constructor(
    public router: Router
  ) {}

  canActivate(): boolean {
    
    if (sessionStorage.getItem('currentUser')) {
      this.router.navigate(['/dashboard']);
    }
    return true;
  }
}
