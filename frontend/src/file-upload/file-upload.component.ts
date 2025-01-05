import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

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
    
    } else {
      console.error('No file selected');
    }
  }
}
