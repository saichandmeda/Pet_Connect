import { ActivatedRouteSnapshot, CanActivateFn, mapToCanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { NgToastService} from 'ng-angular-popup';
import { Directive, ɵɵdirectiveInject } from '@angular/core';
// import 'localstorage-polyfill';

// @Injectable()
// export class GuardComponent {
//   constructor(private toast: NgToastService ) { }
// }
// @Directive({
//   selector: '[myDirective]',
// })
// export class MyDirective {

//   constructor(private toast: NgToastService) {
//     this.toast = ɵɵdirectiveInject(NgToastService);
//   }
// }

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // constructor(private toast: NgToastService ) { }
  const router = inject(Router);
  const toast = inject(NgToastService);
  
  

  // let authService: AuthService = new AuthService();
  // global['localStorage'] = localStorage;
  const localData = localStorage.getItem('token');
  if (localData != null) {
    return true;
  } else {
    toast.error({detail:"ERROR", summary:"Please Login First", duration:5000})
    router.navigateByUrl('/login')
    // alert("Please Login First")
    return false;
  }
};







// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivateFn{
//   constructor(private auth : AuthService){

//   }

// }
