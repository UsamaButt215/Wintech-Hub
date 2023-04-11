import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers: any = new HttpHeaders().set('Content-Type', 'application/json');;
  constructor(private httpClient: HttpClient) { }
  getAllProducts(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'api/getProducts', { headers: this.headers });
  }

}
