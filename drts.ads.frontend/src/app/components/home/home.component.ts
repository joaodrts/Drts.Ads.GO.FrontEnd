import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad } from 'src/app/models/ad.type';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ads$ = new Observable<Ad[]>();

  constructor(private rest: AdService) {
  }

  ngOnInit(): void {
    this.ads$ = this.rest.getAll(); 
  }

}
