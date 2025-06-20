import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.css'
})
export class QrScannerComponent {
  devices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined;
  qrResult: string = '';

  constructor(
    private router:Router
  ){}

  ngOnInit(): void {
    // Get all available video devices
    navigator.mediaDevices.enumerateDevices().then(devices => {
      this.devices = devices.filter(device => device.kind === 'videoinput');
      this.selectedDevice = this.devices[0]; // default to first camera
    });
  }

  onCodeResult(result: any): void {
    this.qrResult = result.trim();
    console.log(this.qrResult);
    
    console.log('Scanned result:', result);

    this.router.navigate(['/user/issue-reporting', this.qrResult]);
  }
}
