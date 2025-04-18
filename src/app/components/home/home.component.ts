import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container mt-5 text-center">
      <h1>Sistema de Gerenciamento de Veículos</h1>
      <p class="lead">Bem-vindo ao sistema de gerenciamento de veículos</p>
      <div class="mt-4">
        <button class="btn btn-primary btn-lg" [routerLink]="['/vehicles']">Ver Veículos</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
  `]
})
export class HomeComponent {}
