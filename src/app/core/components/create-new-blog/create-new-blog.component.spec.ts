import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewBlogComponent } from './create-new-blog.component';

describe('CreateNewBlogComponent', () => {
  let component: CreateNewBlogComponent;
  let fixture: ComponentFixture<CreateNewBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
