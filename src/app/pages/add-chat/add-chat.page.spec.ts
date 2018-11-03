import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChatPage } from './add-chat.page';

describe('AddChatPage', () => {
  let component: AddChatPage;
  let fixture: ComponentFixture<AddChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
