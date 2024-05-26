import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  adForm: FormGroup;

  constructor(public rest: AdService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router){
    this.adForm = this.fb.group({
      //id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      date_start: ['', Validators.required],
      date_end: ['', Validators.required],
      status: ['0'],
      //image: null,
      link: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  @Input() adData: any = { title: '', description: '', date_start:'', date_end: '', status: '', link: '' };

  ngOnInit(): void {
    this.rest.getById(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);

      this.adData = data;
      this.adData.date_start = this.adData.date_start.split('T')[0];
      this.adData.date_end = this.adData.date_end.split('T')[0];
    });
  }

  update(): void {

    this.rest.update(this.route.snapshot.params['id'], this.adData).subscribe({
      next: (result) => {
        console.log("funcionou: " + result);
        
        this.router.navigate(['/']);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    });

  }

}
