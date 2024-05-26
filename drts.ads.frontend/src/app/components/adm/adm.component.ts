import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public rest: AdService, private router: Router) {}

  ngOnInit(): void {
    this.ads$ = this.rest.getAll(); 
  }

  delete(id: any): void {

    this.rest.delete(id).subscribe((data: {}) => {
      this.router.navigate(['/']);
    });
    
  }

  reloadPage(): void {
    window.location.reload();
  }

}
