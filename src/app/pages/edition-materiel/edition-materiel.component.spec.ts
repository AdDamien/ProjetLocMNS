import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionMaterielComponent } from './edition-materiel.component';

describe('EditionMaterielComponent', () => {
  let component: EditionMaterielComponent;
  let fixture: ComponentFixture<EditionMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionMaterielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
