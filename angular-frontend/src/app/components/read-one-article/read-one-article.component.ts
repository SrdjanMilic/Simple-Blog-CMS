import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-read-one-article',
  templateUrl: './read-one-article.component.html',
  styleUrls: ['./read-one-article.component.less']
})
export class ReadOneArticleComponent implements OnInit {

  constructor(public articleService: ArticleService) {  }

  ngOnInit() {
  }

}
