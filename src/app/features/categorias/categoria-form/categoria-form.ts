import { Component, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria, CategoriaInput, TipoCategoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../core/services/categoria.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-categoria-form',
  styleUrl: './categoria-form.css',
  templateUrl: './categoria-form.html',
})
export class CategoriaForm {

  categoria = input<Categoria | null>(null);
  salvou = output<void>();
  cancelou = output<void>();
  erro = '';

  formulario = new FormGroup({
    descricao: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(60)]
    }),
    tipo: new FormControl<TipoCategoria>('DESPESA', { nonNullable: true }),
    ativo: new FormControl(true, { nonNullable: true })
  });

  constructor( private categoriaService:CategoriaService ) {
    effect(() => {
      const categoria = this.categoria();
      this.erro = '';
      this.formulario.reset(categoria ? {
        descricao: categoria.descricao,
        tipo: categoria.tipo,
        ativo: categoria.ativo
      } : {
        descricao: '', tipo: 'DESPESA', ativo: true
      });
    });
  }

  salvar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const dados: CategoriaInput = this.formulario.getRawValue();
    const categoria = this.categoria();
    if (categoria === null) {
      this.categoriaService.cadastrar(dados);
    } else {
      const atualizada = this.categoriaService.atualizar(categoria.id, dados);
      if (!atualizada) {
        this.erro = 'Categoria não encontrada para atualização.';
        return;
      }
    }

    this.formulario.reset({ descricao: '', tipo: 'DESPESA', ativo: true });
    this.salvou.emit();
  }

  cancelar(): void {
    this.erro = '';
    this.formulario.reset({ descricao: '', tipo: 'DESPESA', ativo: true });
    this.cancelou.emit();
  }
}

