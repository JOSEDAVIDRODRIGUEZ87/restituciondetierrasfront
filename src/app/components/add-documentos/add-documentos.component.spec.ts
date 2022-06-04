import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentosComponent } from './add-documentos.component';

describe('AddDocumentosComponent', () => {
  let component: AddDocumentosComponent;
  let fixture: ComponentFixture<AddDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
