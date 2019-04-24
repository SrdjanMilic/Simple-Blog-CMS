'use strict';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './user';
import { JwtResponse } from './jwt-response';

import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { ArticleService } from '../services/article.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  AUTH_SERVER = 'http://localhost:3000';

  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private router: Router, public articleService: ArticleService) { }

  register(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/api/v1/register`, user).pipe(
      tap((res: JwtResponse) => {
        if (res.user) {
          // localStorage.setItem('token', res.user.accessToken); // If enabled allows user to be logged in automatically after register
          // localStorage.setItem('expiresIn', res.user.expiresIn); // If enabled allows user to be logged in automatically after register
          this.authSubject.next(true);
        }
      })
    );
  }

  login(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/api/v1/login`, user).pipe(
      tap(async (res: JwtResponse) => {
        if (res.user) {
          localStorage.setItem('token', res.user.accessToken);
          localStorage.setItem('expiresIn', res.user.expiresIn);
          this.authSubject.next(true);
        }
      })
    );
  }

  // Check if user is logged in
  public get loggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    this.authSubject.next(false);
    console.log('You are now logged out!');
    this.router.navigateByUrl('login');
    this.articleService.snackBar.open('Bye, bye... You are now logged out!', '', {
      duration: 2000
    });
  }

}

