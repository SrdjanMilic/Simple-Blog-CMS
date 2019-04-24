import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.less']
})

export class ListArticlesComponent implements OnInit {

  constructor(public articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.listArticles();
  }
}

