import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOneArticleComponent } from './read-one-article.component';

describe('ReadOneArticleComponent', () => {
  let component: ReadOneArticleComponent;
  let fixture: ComponentFixture<ReadOneArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadOneArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOneArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
