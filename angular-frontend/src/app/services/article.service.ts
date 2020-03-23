"use strict";

import { Injectable, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Article } from "./article";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  AUTH_SERVER = "http://localhost:3000";

  dataSource: any = [];

  constructor(public httpClient: HttpClient, public snackBar: MatSnackBar) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  createArticle(article: Article) {
    return this.httpClient
      .post(`${this.AUTH_SERVER}/api/v1/create-article`, article)
      .subscribe(() => {
        this.snackBar.open("Article created!", "", {
          duration: 2000,
        });
        console.log(`Submitted to database!`);
      });
  }

  updateArticle(article: Article) {
    return this.httpClient
      .put(`${this.AUTH_SERVER}/api/v1/update-article`, article)
      .subscribe(() => {
        this.snackBar.open("Article updated!", "", {
          duration: 2000,
        });
      });
  }

  listArticles() {
    return this.httpClient
      .get(`${this.AUTH_SERVER}/api/v1/list-articles`)
      .subscribe((res: any[]) => {
        this.dataSource = new MatTableDataSource();
        this.dataSource = res;
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource);
      });
  }

  readArticle(id: number) {
    return this.httpClient
      .get(`${this.AUTH_SERVER}/api/v1/list-articles/${id}`)
      .subscribe((res: any[]) => {
        this.dataSource = res;
        console.log(res);
      });
  }

  deleteArticle(id: number) {
    return this.httpClient
      .delete(`${this.AUTH_SERVER}/api/v1/delete-article/${id}`)
      .subscribe((res: any[]) => {
        this.dataSource.articles = this.dataSource.articles.filter((x) => x.id !== id);
        this.snackBar.open("Article deleted!", "", {
          duration: 2000,
        });
        console.log(res);
      });
  }
}
