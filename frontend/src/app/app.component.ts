import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  
  constructor(private http: HttpClient){}
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file);
      this.uploadFile(file)
    } 
  }

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);

    this.http.post('http://localhost:3000/api/convert-image', formData)
    .subscribe({
      next: response => {
        console.log('Upload response:', response);
      },
      error: error => {
        console.error('Upload error:', error);
      },
      complete: () => {
        console.log('Upload request completed.');
      }
    });
  }
}
