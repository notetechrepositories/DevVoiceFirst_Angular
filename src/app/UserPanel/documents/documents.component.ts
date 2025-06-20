import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
previewUrl: string | null = null;
  currentDownloadUrl: string = '';

  previewDoc(previewUrl: string) {
    this.previewUrl = previewUrl;
    this.currentDownloadUrl = previewUrl.replace('/preview', '/export?format=pdf');
  }

  download(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
  }


   rawDocUrl = 'https://docs.google.com/document/d/1uH1j0IlPXzxppVmeGvM4yFh6SamWclxGIJ-dE924Jqk/preview';
  safeDocUrl: SafeResourceUrl;
  isLoading = true;

  constructor(private sanitizer: DomSanitizer) {
    this.safeDocUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawDocUrl);
  }

  onIframeLoad(): void {
    this.isLoading = false;
  }

}
