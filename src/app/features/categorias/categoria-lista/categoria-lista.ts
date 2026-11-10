import { Component, OnInit } from '@angular/core';
import { CategoriaForm } from '../categoria-form/categoria-form';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../core/services/categoria.service';

@Component({
  imports: [CategoriaForm],
  selector: 'app-categoria-lista',
  styleUrl: './categoria-lista.css',
  templateUrl: './categoria-lista.html',
})
export class CategoriaLista implements OnInit {
  categorias: Categoria[] = [];
  categoriaSelecionada: Categoria | null = null;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categorias = this.categoriaService.listar();
  }

  editar(categoria: Categoria): void {
    this.categoriaSelecionada = { ...categoria };
  }

  aoSalvar(): void {
    this.categoriaSelecionada = null;
    this.carregarCategorias();
  }

  aoCancelar(): void {
    this.categoriaSelecionada = null;
  }

  alterarSituacao(id: number): void {
    this.categoriaService.alterarSituacao(id);
    if (this.categoriaSelecionada?.id === id) {
      this.categoriaSelecionada = null;
    }
    this.carregarCategorias();
  }
}
