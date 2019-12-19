import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateclienteComponent } from './updatecliente.component';

describe('UpdateclienteComponent', () => {
  let component: UpdateclienteComponent;
  let fixture: ComponentFixture<UpdateclienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateclienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
