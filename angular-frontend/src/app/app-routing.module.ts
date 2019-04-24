import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

// Page components
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { DeleteComponent } from './components/delete/delete.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ListArticlesComponent } from './components/list-articles/list-articles.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { ReadOneArticleComponent } from './components/read-one-article/read-one-article.component';

const routes: Routes = [
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: 'home-page', component: HomePageComponent },
  {
    path: 'list-articles',
    children: [
      {
        path: '',
        component: ListArticlesComponent
      },
      {
        path: 'read-one-article/:id',
        children: [
          {
            path: '',
            component: ReadOneArticleComponent
          },
        ]
      },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'create',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: CreateComponent,
        data: {}
      },
    ]
  },
  {
    path: 'update',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: UpdateComponent,
        data: {}
      },
      {
        path: 'edit-article',
        children: [
          {
            path: '',
            component: EditArticleComponent,
            data: {}
          }
        ]
      },
    ]
  },
  {
    path: 'delete',
    component: DeleteComponent,
    canActivate: [AuthGuard]
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        enableTracing: false, // <-- debugging purposes only
        scrollPositionRestoration: 'enabled'
      }
    ),
  ],
  exports: [RouterModule],

  providers: []
})
export class AppRoutingModule { }
