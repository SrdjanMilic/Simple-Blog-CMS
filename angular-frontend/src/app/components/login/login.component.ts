import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, public articleService: ArticleService) { }

  email = new FormControl('', [Validators.required, Validators.email]);

  loginForm = this.fb.group({
    email: this.email,
    password: ['', Validators.minLength(8)]
  });

  hide = true;

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a valid email address' :
      this.email.hasError('email') ? 'Not a valid email address' : '';
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe((res) => {
      this.router.navigateByUrl('home-page');
      this.articleService.snackBar.open('You are now logged in!', '', {
        duration: 2000
      });

    });
    console.log(`${JSON.stringify(this.loginForm.value)}
    You are now logged in!`);
  }

}
