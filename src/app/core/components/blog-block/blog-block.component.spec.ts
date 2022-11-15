import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogBlockComponent } from './blog-block.component';

describe('BlogBlockComponent', () => {
  let component: BlogBlockComponent;
  let fixture: ComponentFixture<BlogBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
