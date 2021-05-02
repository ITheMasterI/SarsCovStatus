import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAtualizaComponent } from './usuario-atualiza.component';

describe('UsuarioAtualizaComponent', () => {
  let component: UsuarioAtualizaComponent;
  let fixture: ComponentFixture<UsuarioAtualizaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioAtualizaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioAtualizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
