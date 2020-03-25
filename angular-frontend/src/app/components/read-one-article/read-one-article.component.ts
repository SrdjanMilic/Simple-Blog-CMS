import { Component, OnInit } from "@angular/core";
import { ArticleService } from "../../services/article.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-read-one-article",
  templateUrl: "./read-one-article.component.html",
  styleUrls: ["./read-one-article.component.less"],
})
export class ReadOneArticleComponent implements OnInit {
  id: number;

  constructor(
    public articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.articleService.readArticle(this.id);
  }
}
