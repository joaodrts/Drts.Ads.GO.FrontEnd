import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Ad } from '../models/ad.type';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  private url = "http://localhost:9000/ads";

  constructor(private httpClient: HttpClient){
  }

  getAll(){
    console.log("chegou");
    
    return this.httpClient.get<Ad[]>(this.url);
  }

  create(ad: any): Observable<any> {
    this.log("entrou pipe");

    return this.httpClient.post(this.url, ad)
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
