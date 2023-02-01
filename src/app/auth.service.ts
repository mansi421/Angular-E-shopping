import { UserService } from './user.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { AppUser } from './models/app-user';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<firebase.User>;

  constructor(
    private UserService: UserService,
    private afAuth:AngularFireAuth, 
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
   }
  
  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.signInWithRedirect(new GoogleAuthProvider());
  }
  logout(){
    this.afAuth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this.UserService.get(user.uid);
        return of(null);
      })
    )
    
   
  }
}
