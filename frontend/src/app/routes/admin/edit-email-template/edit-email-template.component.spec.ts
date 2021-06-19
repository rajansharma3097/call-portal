import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditEmailTemplateComponent } from './edit-email-template.component';

describe('EditEmailTemplateComponent', () => {
  let component: EditEmailTemplateComponent;
  let fixture: ComponentFixture<EditEmailTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmailTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
