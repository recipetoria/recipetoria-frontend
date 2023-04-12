import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurTeamPageComponent } from './our-team-page.component';

describe('OurTeamPageComponent', () => {
  let component: OurTeamPageComponent;
  let fixture: ComponentFixture<OurTeamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurTeamPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
