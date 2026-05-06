/**
 * Servicio de gestión para la entidad Reserva.
 *
 * Centraliza todas las operaciones relacionadas con la administración
 * de reservas dentro del sistema hotelero.
 *
 * Funcionalidades principales:
 * - Consultar listado general de reservas.
 * - Obtener información detallada de una reserva específica.
 * - Registrar nuevas reservas.
 * - Actualizar reservas existentes.
 * - Eliminar reservas.
 *
 * Este servicio funciona como una capa de acceso a datos
 * entre el frontend y la API REST, encapsulando la lógica
 * de comunicación HTTP y promoviendo reutilización.
 *
 * Endpoint base:
 * `${environment.apiUrl}/reserva`
 *
 * Operaciones implementadas:
 * - GET (consulta)
 * - POST (creación)
 * - PATCH (actualización parcial)
 * - DELETE (eliminación)
 */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ReservaCreate, ReservaRead, ReservaUpdate } from '../../models/api.models';

  /**
   * URL base del recurso Reserva en la API.
   *
   * Se genera dinámicamente utilizando la configuración
   * del entorno para soportar múltiples ambientes
   * (desarrollo, testing y producción).
   */
@Injectable({ providedIn: 'root' })
export class ReservaService {
  private readonly base = `${environment.apiUrl}/reserva`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<ReservaRead[]> {
    const params = new HttpParams().set('skip', 0).set('limit', 500);
    return this.http.get<ReservaRead[]>(`${this.base}/`, { params });
  }

  get(id: string): Observable<ReservaRead> {
    return this.http.get<ReservaRead>(`${this.base}/${id}`);
  }

  create(body: ReservaCreate): Observable<ReservaRead> {
    return this.http.post<ReservaRead>(`${this.base}/`, body);
  }

  update(id: string, body: ReservaUpdate): Observable<ReservaRead> {
    return this.http.patch<ReservaRead>(`${this.base}/${id}`, body); // PATCH — coincide con el router
  }

  delete(id: string): Observable<void> {
    return this.http.delete(`${this.base}/${id}`, { observe: 'response' }).pipe(map(() => undefined));
  }
}