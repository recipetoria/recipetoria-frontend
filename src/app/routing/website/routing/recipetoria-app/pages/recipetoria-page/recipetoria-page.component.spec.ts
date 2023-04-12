import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipetoriaPageComponent } from './recipetoria-page.component';

describe('RecipetoriaPageComponent', () => {
  let component: RecipetoriaPageComponent;
  let fixture: ComponentFixture<RecipetoriaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipetoriaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipetoriaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
