import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicComponent } from './geographic.component';

describe('GeographicComponent', () => {
  let component: GeographicComponent;
  let fixture: ComponentFixture<GeographicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeographicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeographicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
