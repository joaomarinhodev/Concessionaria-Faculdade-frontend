import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { Cliente, ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-cadastrar',
  standalone: true,
  imports: [FormsModule, InputTextModule, FloatLabelModule, CardModule, SelectModule, ButtonModule],
  templateUrl: './cliente-cadastrar.html',
  styleUrl: './cliente-cadastrar.css',
})
export class ClienteCadastrar {
  private clienteService = inject(ClienteService);
  tipoPessoaOptions = [
    { label: 'Pessoa Física', value: 'F' },
    { label: 'Pessoa Jurídica', value: 'J' }
  ];
  cliente: Cliente = this.novoCliente();
  salvando = false;

  private novoCliente(): Cliente {
    return { nome:'', tipoPessoa:'F', cpfCnpj:'', telefone:'', cep:'', cidade:'', endereco:'', bairro:'', numero:'', email:'' };
  }

  salvar(): void {
    if (!this.cliente.nome.trim()) { alert('Informe o nome do cliente.'); return; }
    if (!this.cliente.tipoPessoa) { alert('Selecione o tipo de pessoa.'); return; }
    if (!this.cliente.cpfCnpj.trim()) { alert('Informe o CPF/CNPJ.'); return; }
    this.salvando = true;
    this.clienteService.salvar(this.cliente).subscribe({
      next: (clienteSalvo) => { console.log('Cliente salvo:', clienteSalvo); alert('Cliente cadastrado com sucesso!'); this.cliente = this.novoCliente(); this.salvando = false; },
      error: (erro) => { console.error('Erro ao cadastrar cliente:', erro); alert(erro?.error?.message ?? erro?.error ?? 'Não foi possível cadastrar o cliente.'); this.salvando = false; }
    });
  }

  cancelar(): void { this.cliente = this.novoCliente(); }
}
