# Simple blog CMS - Angular frontend

**Directory structure:**

- ../angular-frontend/src/app/auth/auth.guard.ts  
Authentication service (guard route): You can't reach for example url "http://localhost:4200/delete" if you are not logged in.
You will get "access denied" error.

- ../angular-frontend/src/app/auth/auth.service.ts  
Register, login and logout app logic with JWT authentication and local storage for token.

- ../angular-frontend/src/app/components/access-denied  
Access denied page html, less files

- ../angular-frontend/src/app/components/create  
Create article page html, less and page logic

- ../angular-frontend/src/app/components/delete  
Delete article page html, less and page logic files

- ../angular-frontend/src/app/components/edit-article  
Edit article page html, less and page logic

- ../angular-frontend/src/app/components/home-page  
Home page html, less files

- ../angular-frontend/src/app/components/list-articles  
List articles page html, less

- ../angular-frontend/src/app/components/login  
Login page html, less and page logic files

- ../angular-frontend/src/app/components/page-not-found  
Page not found html, less files

- ../angular-frontend/src/app/components/read-one-article  
Read one article page html files

- ../angular-frontend/src/app/components/register  
Register page html, less and page logic files

- ../angular-frontend/src/app/components/update  
Register page html, less and page logic files

- ../angular-frontend/src/app/services  
Articles logic services for CRUD operations, pagination, material snack bar...

angular-frontend/src/app/app.component.html,  
angular-frontend/src/app/app.component.less,  
angular-frontend/src/app/app.component.ts,  
angular-frontend/src/app/app.module.ts,  
angular-frontend/src/index.html,  
angular-frontend/src/styles.less,  
are self-explanatory files