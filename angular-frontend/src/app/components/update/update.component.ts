import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  columnsToDisplay: string[] = ['id', 'title', 'userId', 'delete'];

  constructor(public articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.listArticles();
  }

  onSubmit() {
  }

}
