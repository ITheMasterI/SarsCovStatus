import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioVisualizacaoComponent } from './usuario-visualizacao.component';

describe('UsuarioVisualizacaoComponent', () => {
  let component: UsuarioVisualizacaoComponent;
  let fixture: ComponentFixture<UsuarioVisualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioVisualizacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
