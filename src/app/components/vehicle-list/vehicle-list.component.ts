import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h2>Lista de Veículos</h2>
      <div class="mb-3">
        <button class="btn btn-primary" [routerLink]="['/vehicles/new']">Adicionar Veículo</button>
      </div>

      <div *ngIf="loading" class="text-center">
        <p>Carregando...</p>
      </div>

      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>

      <table *ngIf="!loading && vehicles.length > 0" class="table table-striped">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Ano</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let vehicle of vehicles">
            <td>{{ vehicle.placa }}</td>
            <td>{{ vehicle.modelo }}</td>
            <td>{{ vehicle.marca }}</td>
            <td>{{ vehicle.ano }}</td>
            <td>
              <button class="btn btn-sm btn-info me-2" [routerLink]="['/vehicles', vehicle.id]">Ver</button>
              <button class="btn btn-sm btn-warning me-2" [routerLink]="['/vehicles/edit', vehicle.id]">Editar</button>
              <button class="btn btn-sm btn-danger" (click)="deleteVehicle(vehicle.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div *ngIf="!loading && vehicles.length === 0" class="alert alert-info">
        Nenhum veículo cadastrado.
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  loading = false;
  error = '';

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.loading = true;
    this.error = '';

    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar veículos. Por favor, tente novamente.';
        console.error('Erro ao carregar veículos:', err);
        this.loading = false;
      }
    });
  }

  deleteVehicle(id?: string): void {
    if (!id) return;

    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      this.vehicleService.deleteVehicle(id).subscribe({
        next: () => {
          this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
        },
        error: (err) => {
          this.error = 'Erro ao excluir veículo. Por favor, tente novamente.';
          console.error('Erro ao excluir veículo:', err);
        }
      });
    }
  }
}
