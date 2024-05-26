import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdService } from 'src/app/services/ad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  adForm: FormGroup;
  //selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private rest: AdService, private router: Router) {
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

  onSubmit(): void {
  
    if (this.adForm.valid) {

      const formData = this.adForm.value;
    
      this.rest.create(formData).subscribe({
        next: (result) => {
          console.log('Ad created successfully:', result);
          this.router.navigate(['/']);
        },
        error: (e: any) => {
          console.log(e);
        }
      });
    }

  }

  /*onImageSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedImage = file;
  }*/
}
