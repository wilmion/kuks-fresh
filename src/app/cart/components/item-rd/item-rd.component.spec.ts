import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRdComponent } from './item-rd.component';

describe('ItemRdComponent', () => {
  let component: ItemRdComponent;
  let fixture: ComponentFixture<ItemRdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
