import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h2>{{ isEditMode ? 'Editar' : 'Adicionar' }} Veículo</h2>

      <div *ngIf="loading" class="text-center">
        <p>Carregando...</p>
      </div>

      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>

      <form [formGroup]="vehicleForm" (ngSubmit)="onSubmit()" *ngIf="!loading">
        <div class="mb-3">
          <label for="placa" class="form-label">Placa</label>
          <input type="text" class="form-control" id="placa" formControlName="placa">
          <div *ngIf="vehicleForm.get('placa')?.invalid && vehicleForm.get('placa')?.touched" class="text-danger">
            Placa é obrigatória
          </div>
        </div>

        <div class="mb-3">
          <label for="chassi" class="form-label">Chassi</label>
          <input type="text" class="form-control" id="chassi" formControlName="chassi">
          <div *ngIf="vehicleForm.get('chassi')?.invalid && vehicleForm.get('chassi')?.touched" class="text-danger">
            Chassi é obrigatório
          </div>
        </div>

        <div class="mb-3">
          <label for="renavam" class="form-label">Renavam</label>
          <input type="text" class="form-control" id="renavam" formControlName="renavam">
          <div *ngIf="vehicleForm.get('renavam')?.invalid && vehicleForm.get('renavam')?.touched" class="text-danger">
            Renavam é obrigatório
          </div>
        </div>

        <div class="mb-3">
          <label for="modelo" class="form-label">Modelo</label>
          <input type="text" class="form-control" id="modelo" formControlName="modelo">
          <div *ngIf="vehicleForm.get('modelo')?.invalid && vehicleForm.get('modelo')?.touched" class="text-danger">
            Modelo é obrigatório
          </div>
        </div>

        <div class="mb-3">
          <label for="marca" class="form-label">Marca</label>
          <input type="text" class="form-control" id="marca" formControlName="marca">
          <div *ngIf="vehicleForm.get('marca')?.invalid && vehicleForm.get('marca')?.touched" class="text-danger">
            Marca é obrigatória
          </div>
        </div>

        <div class="mb-3">
          <label for="ano" class="form-label">Ano</label>
          <input type="number" class="form-control" id="ano" formControlName="ano">
          <div *ngIf="vehicleForm.get('ano')?.invalid && vehicleForm.get('ano')?.touched" class="text-danger">
            Ano é obrigatório
          </div>
        </div>

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-primary" [disabled]="vehicleForm.invalid">Salvar</button>
          <button type="button" class="btn btn-secondary" [routerLink]="['/vehicles']">Cancelar</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
  `]
})
export class VehicleFormComponent implements OnInit {
  vehicleForm!: FormGroup;
  isEditMode = false;
  vehicleId: string | null = null;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.vehicleId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.vehicleId;

    if (this.isEditMode && this.vehicleId) {
      this.loadVehicle(this.vehicleId);
    }
  }

  initForm(): void {
    this.vehicleForm = this.fb.group({
      placa: ['', Validators.required],
      chassi: ['', Validators.required],
      renavam: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      ano: [null, Validators.required]
    });
  }

  loadVehicle(id: string): void {
    this.loading = true;
    this.vehicleService.getVehicle(id).subscribe({
      next: (vehicle) => {
        this.vehicleForm.patchValue(vehicle);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar dados do veículo';
        console.error('Erro ao carregar veículo:', err);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.invalid) return;

    const vehicle: Vehicle = this.vehicleForm.value;
    this.loading = true;

    if (this.isEditMode && this.vehicleId) {
      this.vehicleService.updateVehicle(this.vehicleId, vehicle).subscribe({
        next: () => {
          this.router.navigate(['/vehicles']);
        },
        error: (err) => {
          if (err.status === 400) {
            this.error = 'Veículo já cadastrado';
          } else {
            this.error = 'Erro ao atualizar veículo';
          }
          console.error('Erro ao atualizar veículo:', err);
          this.loading = false;
        }
      });
    } else {
      this.vehicleService.createVehicle(vehicle).subscribe({
        next: () => {
          this.router.navigate(['/vehicles']);
        },
        error: (err) => {
          if (err.status === 400) {
            this.error = 'Veículo já cadastrado';
          } else {
            this.error = 'Erro ao criar veículo';
          }
          console.error('Erro ao criar veículo:', err);
          this.loading = false;
        }
      });
    }
  }
}
