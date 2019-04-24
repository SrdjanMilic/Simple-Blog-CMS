import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';

@Component({
  providers: [ArticleService],
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.less']
})

export class DeleteComponent implements OnInit {

  columnsToDisplay: string[] = ['id', 'title', 'user_id', 'delete'];

  constructor(public articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.listArticles();
  }

  onRowClicked(row: { id: any; }) {
    console.log(`Row clicked: ${row.id}`);
  }
}

