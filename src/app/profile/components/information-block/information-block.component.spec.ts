import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationBlockComponent } from './information-block.component';

describe('InformationBlockComponent', () => {
  let component: InformationBlockComponent;
  let fixture: ComponentFixture<InformationBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
