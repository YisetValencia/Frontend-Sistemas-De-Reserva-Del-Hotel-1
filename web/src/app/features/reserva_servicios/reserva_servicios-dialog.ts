import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { ServiciosAdicionalesService } from '../../core/services/servicios_adicionales.service';
import { ReservaServiciosService } from '../../core/services/reserva_servicios.service';
import { ServiciosAdicionalesRead, ReservaServiciosRead } from '../../models/api.models';

/**
 * Define la estructura de datos utilizada
 * para configurar el comportamiento del diálogo
 * de servicios asociados a reservas.
 *
 * Esta interfaz permite determinar:
 * - El modo de operación del formulario
 * - La reserva objetivo
 * - El registro seleccionado para edición
 */
export interface ReservaServiciosDialogData {
  mode: 'create' | 'edit';
  id_reserva: string;
  row?: ReservaServiciosRead;
}
/**
 * Componente especializado en la administración
 * de servicios adicionales vinculados a reservas.
 *
 * Propósito:
 * Centralizar la lógica de creación y edición
 * de registros de servicios-reserva,
 * garantizando validación, integridad de datos
 * y comunicación eficiente con el backend.
 *
 * Capacidades principales:
 * - Consulta de catálogo de servicios
 * - Formularios reactivos con validación
 * - Registro de nuevos servicios
 * - Actualización de cantidades
 * - Gestión de errores HTTP
 * - Retroalimentación visual al usuario
 *
 * Integraciones:
 * - Angular Reactive Forms
 * - Angular Material Dialog
 * - Angular Material SnackBar
 * - Servicios de dominio hotelero
 */
@Component({
  selector: 'app-reserva_servicios-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './reserva_servicios-dialog.html',
})

export class ReservaServiciosDialogComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly svc = inject(ReservaServiciosService);
  private readonly serviciosSvc = inject(ServiciosAdicionalesService);
  private readonly dialogRef = inject(MatDialogRef<ReservaServiciosDialogComponent, boolean>);
  private readonly snack = inject(MatSnackBar);

  readonly data = inject<ReservaServiciosDialogData>(MAT_DIALOG_DATA);
  readonly servicios = signal<ServiciosAdicionalesRead[]>([]);

  readonly form = this.fb.nonNullable.group({
    id_servicio: [
      this.data.mode === 'edit' ? (this.data.row?.id_servicio ?? '') : '',
      Validators.required,
    ],
    cantidad: [
      this.data.mode === 'edit' ? (this.data.row?.cantidad ?? 1) : 1,
      [Validators.required, Validators.min(1)],
    ],
  });

  ngOnInit(): void {
    this.serviciosSvc.list().subscribe({
      next: (rows) => this.servicios.set(rows),
      error: (err: HttpErrorResponse) =>
        this.snack.open(this.msg(err), 'Cerrar', { duration: 6000 }),
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
/**
 * Componente especializado en la administración
 * de servicios adicionales vinculados a reservas.
 *
 * Propósito:
 * Centralizar la lógica de creación y edición
 * de registros de servicios-reserva,
 * garantizando validación, integridad de datos
 * y comunicación eficiente con el backend.
 *
 * Capacidades principales:
 * - Consulta de catálogo de servicios
 * - Formularios reactivos con validación
 * - Registro de nuevos servicios
 * - Actualización de cantidades
 * - Gestión de errores HTTP
 * - Retroalimentación visual al usuario
 *
 * Integraciones:
 * - Angular Reactive Forms
 * - Angular Material Dialog
 * - Angular Material SnackBar
 * - Servicios de dominio hotelero
 */
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();

    if (this.data.mode === 'create') {
      this.svc.create({
        id_reserva:  this.data.id_reserva,
        id_servicio: v.id_servicio,
        cantidad:    v.cantidad,
      }).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err: HttpErrorResponse) =>
          this.snack.open(this.msg(err), 'Cerrar', { duration: 6000 }),
      });
      return;
    }

    this.svc.update(
      this.data.row!.id_reserva,
      this.data.row!.id_servicio,
      { cantidad: v.cantidad },
    ).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err: HttpErrorResponse) =>
        this.snack.open(this.msg(err), 'Cerrar', { duration: 6000 }),
    });
  }
  /**
   * Normaliza errores provenientes
   * de respuestas HTTP del backend
   * para transformarlos en mensajes
   * comprensibles para interfaz de usuario.
   *
   * param err Objeto de error HTTP capturado.
   * returns Mensaje procesado y legible.
   */
  private msg(err: HttpErrorResponse): string {
    const d = err.error?.detail;
    if (typeof d === 'string') return d;
    if (Array.isArray(d)) return d.map((x) => x.msg ?? JSON.stringify(x)).join('; ');
    return err.message;
  }
}