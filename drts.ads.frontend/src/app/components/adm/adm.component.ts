import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad } from 'src/app/models/ad.type';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent {

  ads$ = new Observable<Ad[]>();

  constructor(public rest: AdService) {}

  ngOnInit(): void {
    this.ads$ = this.rest.getAll(); 
  }

  delete(id: any): void {

    this.rest.delete(id).subscribe((data: {}) => {
      console.log("excluiu: " +data);
      this.reloadPage();
    });
    
  }

  reloadPage(): void {
    window.location.reload();
  }

}
