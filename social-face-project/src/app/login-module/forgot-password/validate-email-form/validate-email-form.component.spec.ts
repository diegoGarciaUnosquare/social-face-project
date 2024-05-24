import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateEmailFormComponent } from './validate-email-form.component';

describe('ValidateEmailFormComponent', () => {
  let component: ValidateEmailFormComponent;
  let fixture: ComponentFixture<ValidateEmailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateEmailFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidateEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
