import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAppPageComponent } from './home-app-page.component';

describe('HomeAppPageComponent', () => {
  let component: HomeAppPageComponent;
  let fixture: ComponentFixture<HomeAppPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAppPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAppPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
