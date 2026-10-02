import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id?: number;
  nome: string;
  tipoPessoa: string;
  cpfCnpj: string;
  telefone: string;
  cep: string;
  cidade: string;
  endereco: string;
  bairro: string;
  numero: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/api/clientes';
  listar(): Observable<Cliente[]> { return this.http.get<Cliente[]>(this.API); }
  buscarPorId(id: number): Observable<Cliente> { return this.http.get<Cliente>(`${this.API}/${id}`); }
  salvar(cliente: Cliente): Observable<Cliente> { return this.http.post<Cliente>(this.API, cliente); }
  excluir(id: number): Observable<void> { return this.http.delete<void>(`${this.API}/${id}`); }
}
