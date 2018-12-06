import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionApprovalComponent } from './question-approval.component';

describe('QuestionApprovalComponent', () => {
  let component: QuestionApprovalComponent;
  let fixture: ComponentFixture<QuestionApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
