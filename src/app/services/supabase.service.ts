import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { userLogin } from '../models/userLogin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private baseUrl = environment.renderBackendUrl;

  constructor(private http: HttpClient) {}

  login(userLogin: userLogin): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/usuario`, {
        email: userLogin.email,
        password: userLogin.password,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('An error occurred:', error.error.message);
    } else {
      // El backend devolvió un código de estado no exitoso.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Devolver un observable con un mensaje de error descriptivo
    return throwError(
      'Ocurrió un error al intentar iniciar sesión. Por favor, inténtelo de nuevo más tarde.'
    );
  }
}
