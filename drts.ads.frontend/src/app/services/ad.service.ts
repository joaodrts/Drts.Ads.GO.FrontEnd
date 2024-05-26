import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Ad } from '../models/ad.type';
import { Observable, catchError, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  private url = "http://localhost:9000/ads";

  constructor(private httpClient: HttpClient){
  }

  getAll(): Observable<any>{
    console.log("chegou");
    
    return this.httpClient.get<Ad[]>(this.url)
      .pipe(
        retry(3),
        catchError(this.handleError())
      );
  }

  getById(id: any): Observable<any> {
    this.log("entrou getbyid")
    return this.httpClient.get<Ad>(this.url + "/" + id)
      .pipe(
        retry(3), 
        catchError(this.handleError())
      );
  }

  create(ad: any): Observable<any> {
    this.log("entrou pipe");

    return this.httpClient.post<Ad>(this.url, ad)
      .pipe(
        catchError(this.handleError())
      );
  }

  update(id: string, ad: Ad): Observable<any> {
    return this.httpClient.put<Ad>(this.url + "/" + id, ad)
      .pipe(
        catchError(this.handleError())
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
 
}
