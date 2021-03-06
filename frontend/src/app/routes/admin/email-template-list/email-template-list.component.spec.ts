import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmailTemplateListComponent } from './email-template-list.component';

describe('EmailTemplateListComponent', () => {
  let component: EmailTemplateListComponent;
  let fixture: ComponentFixture<EmailTemplateListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
