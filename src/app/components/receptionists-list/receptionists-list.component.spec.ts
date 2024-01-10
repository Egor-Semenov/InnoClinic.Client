import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistsListComponent } from './receptionists-list.component';

describe('ReceptionistsListComponent', () => {
  let component: ReceptionistsListComponent;
  let fixture: ComponentFixture<ReceptionistsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionistsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
