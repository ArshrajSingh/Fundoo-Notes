import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePurchaseComponent } from './service-purchase.component';

describe('ServicePurchaseComponent', () => {
  let component: ServicePurchaseComponent;
  let fixture: ComponentFixture<ServicePurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
