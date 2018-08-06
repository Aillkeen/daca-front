import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuvidaDetailComponent } from './duvida-detail.component';

describe('AssistenciaDetailComponent', () => {
  let component: DuvidaDetailComponent;
  let fixture: ComponentFixture<DuvidaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuvidaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuvidaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
