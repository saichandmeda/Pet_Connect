import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetComponent } from './forget.component';

describe('LoginComponent', () => {
  let component: ForgetComponent;
  let fixture: ComponentFixture<ForgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});