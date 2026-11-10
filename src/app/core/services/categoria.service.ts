
import { Injectable } from '@angular/core';
import {
  Categoria,
  CategoriaInput
} from '../../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categorias: Categoria[] = [
    { id: 1, descricao: 'Salário', tipo: 'RECEITA', ativo: true },
    { id: 2, descricao: 'Alimentação', tipo: 'DESPESA', ativo: true },
    { id: 3, descricao: 'Moradia', tipo: 'DESPESA', ativo: true }
  ];

  private proximoId = 4;

  listar(): Categoria[] {
    return [...this.categorias];
  }

  buscarPorId(id: number): Categoria | undefined {
    return this.categorias.find(c => c.id === id);
  }

  cadastrar(dados: CategoriaInput): Categoria {
    const categoria: Categoria = {
      ...dados,
      id: this.proximoId++
    };

    this.categorias.push(categoria);

    return categoria;
  }

  atualizar(id: number, dados: CategoriaInput): Categoria | undefined {
    const indice = this.categorias.findIndex(c => c.id === id);

    if (indice === -1) {
      return undefined;
    }

    const categoriaAtualizada: Categoria = {
      ...this.categorias[indice],
      ...dados,
      id
    };

    this.categorias[indice] = categoriaAtualizada;

    return categoriaAtualizada;
  }

  alterarSituacao(id: number): Categoria | undefined {
    const categoria = this.categorias.find(c => c.id === id);

    if (!categoria) {
      return undefined;
    }

    categoria.ativo = !categoria.ativo;

    return categoria;
  }
}
