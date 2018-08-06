import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuvidaNewComponent } from './duvida-new.component';

describe('DuvidaNewComponent', () => {
  let component: DuvidaNewComponent;
  let fixture: ComponentFixture<DuvidaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuvidaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuvidaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
