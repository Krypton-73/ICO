import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): boolean {
    this.router.navigate(['/maintenance']);
    return true;
  }
}
