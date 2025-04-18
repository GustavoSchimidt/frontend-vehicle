import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div *ngIf="loading" class="text-center">
        <p>Carregando...</p>
      </div>

      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div *ngIf="!loading && vehicle">
        <h2>Detalhes do Veículo</h2>

        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ vehicle.modelo }} - {{ vehicle.marca }}</h5>
            <div class="row mt-3">
              <div class="col-md-6">
                <p><strong>Placa:</strong> {{ vehicle.placa }}</p>
                <p><strong>Chassi:</strong> {{ vehicle.chassi }}</p>
                <p><strong>Renavam:</strong> {{ vehicle.renavam }}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Modelo:</strong> {{ vehicle.modelo }}</p>
                <p><strong>Marca:</strong> {{ vehicle.marca }}</p>
                <p><strong>Ano:</strong> {{ vehicle.ano }}</p>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary me-2" [routerLink]="['/vehicles']">Voltar</button>
            <button class="btn btn-warning me-2" [routerLink]="['/vehicles/edit', vehicle.id]">Editar</button>
            <button class="btn btn-danger" (click)="deleteVehicle()">Excluir</button>
          </div>
        </div>
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
export class VehicleDetailComponent implements OnInit {
  vehicle: Vehicle | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.getVehicle();
  }

  getVehicle(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID do veículo não encontrado';
      return;
    }

    this.loading = true;
    this.vehicleService.getVehicle(id).subscribe({
      next: (data) => {
        this.vehicle = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar detalhes do veículo';
        console.error('Erro ao carregar veículo:', err);
        this.loading = false;
      }
    });
  }

  deleteVehicle(): void {
    if (!this.vehicle?.id) return;

    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      this.vehicleService.deleteVehicle(this.vehicle.id).subscribe({
        next: () => {
          this.router.navigate(['/vehicles']);
        },
        error: (err) => {
          this.error = 'Erro ao excluir veículo';
          console.error('Erro ao excluir veículo:', err);
        }
      });
    }
  }
}
