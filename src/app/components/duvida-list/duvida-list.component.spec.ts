import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuvidaListComponent } from './duvida-list.component';

describe('DuvidaListComponent', () => {
  let component: DuvidaListComponent;
  let fixture: ComponentFixture<DuvidaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuvidaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuvidaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
