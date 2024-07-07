import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserLogin } from '../models/IUserLogin';
import * as e from 'cors';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = environment.renderBackendUrl;

  constructor(private http: HttpClient) {}

  authenticateUser(userLogin: IUserLogin): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/authenticate?email=${userLogin.email}&password=${userLogin.password}`
    );
  }
}
