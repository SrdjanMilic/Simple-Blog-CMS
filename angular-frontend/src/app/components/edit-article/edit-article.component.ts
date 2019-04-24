import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.less']
})
export class EditArticleComponent implements OnInit {

  constructor(public articleService: ArticleService, private fb: FormBuilder) { }

  EditArticleForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    id: ['', Validators.required]
  });

  ngOnInit() {
  }

  onSubmit() {
    this.articleService.updateArticle(this.EditArticleForm.value);
    console.log(`${JSON.stringify(this.EditArticleForm.value)}
    You have edited an article!`);
  }

}
