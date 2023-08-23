import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseviewComponent } from './baseview.component';

describe('BaseviewComponent', () => {
  let component: BaseviewComponent;
  let fixture: ComponentFixture<BaseviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseviewComponent]
    });
    fixture = TestBed.createComponent(BaseviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
