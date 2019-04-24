import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})

export class RegisterComponent {

  email = new FormControl('', [Validators.required, Validators.email]);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: this.email,
    password: ['', Validators.minLength(8)]
  });

  hide = true;

  constructor(private fb: FormBuilder, private authService: AuthService,
              public articleService: ArticleService, private router: Router) { }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a valid email address' :
      this.email.hasError('email') ? 'Not a valid email address' : '';
  }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe((res) => {
      console.log(`${JSON.stringify(this.registerForm.value)}
      Submitted to database!`
      );
      this.articleService.snackBar.open('You are now registered!', '', {
        duration: 3000
      });
      this.router.navigateByUrl('login');
    });
  }

}
