import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { apiUrl } from "../../../environment/environment";
import { Observable } from "rxjs";
import { Appointment } from "../models/appointment.model";
import { Page } from "../models/appointment-page.model";
import { Direction } from '../models/direction.model';
import { SortField } from '../models/sort-field.model';
import { Search } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentRestService {

  constructor(private http: HttpClient) { }

  getAppointments(page: number): Observable<Page<Appointment>> {
    const params = new HttpParams()
      .set('page', page.toString());

    return this.http.get<Page<Appointment>>(apiUrl + "/appointment", { params: params });
  }

  getAppointmentById(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(apiUrl + '/appointment/' + id);
  }

  editAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(apiUrl + "/appointment/" + appointment.id, appointment);
  }

  saveAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(apiUrl + "/appointment", appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(apiUrl + "/appointment/" + id);
  }

  getFilteredAppointments(search: Search, page: number): Observable<Page<Appointment>> {
    let params = new HttpParams()
      .set('page', page);

    if (search.animalName) {
      params = params.set('animalName', search.animalName)
    }
    if (search.doctorName) {
      params = params.set('doctorName', search.doctorName)
    }
    if (search.date) {
      params = params.set('dateTime', search.date)
    }
    if (search.medicalService) {
      params = params.set('medicalService', search.medicalService)
    }
    if (search.diagnosis) {
      params = params.set('diagnosis', search.diagnosis)
    }
    if (search.status) {
      params = params.set('status', search.status)
    }
    if (search.sortField) {
      params = params.set('sortField', search.sortField)
    }
    if (search.direction) {
      params = params.set('direction', search.direction)
    }
    return this.http.get<Page<Appointment>>(apiUrl + "/appointment", { params: params });
  }
}