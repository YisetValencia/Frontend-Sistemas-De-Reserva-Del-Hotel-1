/**
 * Servicio de gestión para la entidad ReservaServicios.
 *
 * Proporciona métodos para la administración de servicios adicionales
 * asociados a reservas dentro del sistema hotelero.
 *
 * Responsabilidades principales:
 * - Consultar servicios vinculados a una reserva específica.
 * - Registrar nuevos servicios en reservas existentes.
 * - Actualizar cantidades de servicios asociados.
 * - Eliminar servicios vinculados a reservas.
 *
 * Este servicio actúa como capa de comunicación entre la aplicación
 * frontend y la API REST del backend, centralizando las operaciones
 * HTTP relacionadas con la gestión de ReservaServicios.
 *
 * Endpoint base:
 * `${environment.apiUrl}/reserva-servicios`
 *
 * Implementa:
 * - GET para consultas
 * - POST para creación
 * - PATCH para actualizaciones parciales
 * - DELETE para eliminación
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ReservaServiciosCreate, ReservaServiciosRead, ReservaServiciosUpdate } from '../../models/api.models';


@Injectable({ providedIn: 'root' })
export class ReservaServiciosService {

   /**
   * URL base del recurso ReservaServicios en la API.
   *
   * Se construye dinámicamente a partir de la configuración global
   * del entorno para facilitar despliegues en distintos ambientes
   * (desarrollo, pruebas o producción).
   */

  private readonly base = `${environment.apiUrl}/reserva-servicios`; // guión — coincide con el router
  /**
   * Inicializa el servicio con el cliente HTTP de Angular.
   *
   * @param http Cliente HTTP utilizado para realizar solicitudes REST.
   */
  constructor(private readonly http: HttpClient) {}
   /**
   * Obtiene todos los servicios asociados a una reserva específica.
   *
   * Este método consulta el backend utilizando el identificador
   * de reserva como parámetro de búsqueda.
   *
   * param id_reserva Identificador único de la reserva.
   * returns Observable con la lista de servicios asociados.
   */
  listByReserva(id_reserva: string): Observable<ReservaServiciosRead[]> {
    return this.http.get<ReservaServiciosRead[]>(`${this.base}/reserva/${id_reserva}`);
  }
   /**
   * Registra un nuevo servicio adicional para una reserva.
   *
   * Envía al backend la información necesaria para crear
   * una nueva relación entre reserva y servicio.
   *
   * param body Datos requeridos para crear el registro.
   * returns Observable con el registro creado.
   */

  create(body: ReservaServiciosCreate): Observable<ReservaServiciosRead> {
    return this.http.post<ReservaServiciosRead>(`${this.base}/`, body);
  }
   /**
   * Actualiza la cantidad de un servicio previamente asociado
   * a una reserva específica.
   *
   * Utiliza una actualización parcial mediante HTTP PATCH.
   *
   * arroba param id_reserva Identificador de la reserva.
   * param id_servicio Identificador del servicio asociado.
   * param body Datos actualizados del servicio.
   * returns Observable con el registro actualizado.
   */
  update(id_reserva: string, id_servicio: string, body: ReservaServiciosUpdate): Observable<ReservaServiciosRead> {
    return this.http.patch<ReservaServiciosRead>(`${this.base}/${id_reserva}/${id_servicio}`, body); // PATCH
  }
    /**
   * Elimina la asociación entre un servicio y una reserva.
   *
   * Ejecuta una operación DELETE sobre el recurso específico.
   *
   * param id_reserva Identificador de la reserva.
   * param id_servicio Identificador del servicio.
   * returns Observable<void> indicando finalización exitosa.
   */
  delete(id_reserva: string, id_servicio: string): Observable<void> {
    return this.http.delete(`${this.base}/${id_reserva}/${id_servicio}`, { observe: 'response' })
      .pipe(map(() => undefined));
  }
}