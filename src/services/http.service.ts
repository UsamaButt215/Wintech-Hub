import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers: any = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }
  login(data): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/login', data, { headers: this.headers });
  }
  getAllProducts(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'api/getProducts', { headers: this.headers });
  }
  getSingleProductByID(id): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'api/getSingleProduct?id=' + id, { headers: this.headers });
  }
  sendMessage(data): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'api/messages/sendMessage', data, { headers: this.headers });
  }
}
