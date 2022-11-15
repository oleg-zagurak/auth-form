import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableModalComponent } from './editable-modal.component';

describe('EditableModalComponent', () => {
  let component: EditableModalComponent;
  let fixture: ComponentFixture<EditableModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
