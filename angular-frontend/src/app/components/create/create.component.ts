import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {

  constructor(public articleService: ArticleService, private fb: FormBuilder) { }

  CreateArticleForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    user_id: ['', Validators.required]
  });

  ngOnInit() {
  }

  onSubmit() {
    this.articleService.createArticle(this.CreateArticleForm.value);
    console.log(`${JSON.stringify(this.CreateArticleForm.value)}`);
  }
}

