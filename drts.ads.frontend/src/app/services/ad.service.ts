import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Ad } from '../models/ad.type';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  private url = "http://localhost:9000/ads";

  constructor(private httpClient: HttpClient){
  }

  obterAds(){
    console.log("chegou");
    
    return this.httpClient.get<Ad[]>(this.url);
  }
}
