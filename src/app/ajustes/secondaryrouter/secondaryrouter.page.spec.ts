import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryrouterPage } from './secondaryrouter.page';

describe('SecondaryrouterPage', () => {
  let component: SecondaryrouterPage;
  let fixture: ComponentFixture<SecondaryrouterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryrouterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryrouterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
