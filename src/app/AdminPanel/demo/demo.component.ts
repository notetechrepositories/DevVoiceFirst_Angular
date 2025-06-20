import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface Customer {
  id: number;
  name: string;
  country: string;
  company: string;
  date: string;
  status: string;
  verified: boolean;
  activity: number;
  representative: string;
  balance: number;
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {
 
  first: number = 0;
  rows: number = 10;

  customers: Customer[] = []; // You will populate this with the customer data
  addPopupVisible:boolean=false;
  form!: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(){
    this.loadCustomers();
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      check: [false]
    });

  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.customers ? this.first + this.rows >= this.customers.length : true;
  }

  isFirstPage(): boolean {
    return this.customers ? this.first === 0 : true;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  loadCustomers() {
    this.customers = [
      {
        id: 1000,
        name: 'James Butt',
        country: 'Algeria',
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'unqualified',
        verified: true,
        activity: 17,
        representative: 'Ioni Bowcher',
        balance: 70663
      },
      {
        id: 1001,
        name: 'Josephine Darakjy',
        country: 'Egypt',
        company: 'Chanay, Jeffrey A Esq',
        date: '2019-02-01',
        status: 'proposal',
        verified: false,
        activity: 56,
        representative: 'Amy Elsner',
        balance: 82349
      },
      {
        id: 1002,
        name: 'Art Venere',
        country: 'France',
        company: 'Chemel, James L Cpa',
        date: '2020-06-23',
        status: 'qualified',
        verified: true,
        activity: 23,
        representative: 'Asiya Javayant',
        balance: 45123
      },
      {
        id: 1003,
        name: 'Lenna Paprocki',
        country: 'Brazil',
        company: 'Feltz Printing Service',
        date: '2018-11-12',
        status: 'new',
        verified: false,
        activity: 34,
        representative: 'Xuxue Feng',
        balance: 38951
      },
      {
        id: 1004,
        name: 'Donette Foller',
        country: 'USA',
        company: 'Printing Dimensions',
        date: '2021-03-19',
        status: 'negotiation',
        verified: true,
        activity: 87,
        representative: 'Onyama Limba',
        balance: 92513
      },
      {
        id: 1005,
        name: 'Simona Morasca',
        country: 'Spain',
        company: 'Chapman, Ross E Esq',
        date: '2017-07-03',
        status: 'renewal',
        verified: false,
        activity: 12,
        representative: 'Ivan Magalhaes',
        balance: 61324
      },
      {
        id: 1006,
        name: 'Mitsue Tollner',
        country: 'Italy',
        company: 'Morlong Associates',
        date: '2020-09-30',
        status: 'unqualified',
        verified: true,
        activity: 45,
        representative: 'Stephen Shaw',
        balance: 49238
      },
      {
        id: 1007,
        name: 'Leota Dilliard',
        country: 'Germany',
        company: 'Commercial Press',
        date: '2016-12-11',
        status: 'qualified',
        verified: true,
        activity: 64,
        representative: 'Amy Elsner',
        balance: 73590
      },
      {
        id: 1008,
        name: 'Sage Wieser',
        country: 'Mexico',
        company: 'Truhlar And Truhlar Attys',
        date: '2019-05-14',
        status: 'proposal',
        verified: false,
        activity: 22,
        representative: 'Ioni Bowcher',
        balance: 47211
      },
      {
        id: 1009,
        name: 'Kris Marrier',
        country: 'Canada',
        company: 'King, Christopher A Esq',
        date: '2022-02-22',
        status: 'negotiation',
        verified: true,
        activity: 33,
        representative: 'Asiya Javayant',
        balance: 63824
      },
      {
        id: 1010,
        name: 'Minna Amigon',
        country: 'Australia',
        company: 'Dorl, James J Esq',
        date: '2021-08-07',
        status: 'renewal',
        verified: false,
        activity: 28,
        representative: 'Xuxue Feng',
        balance: 31482
      },
      {
        id: 1011,
        name: 'Abel Maclead',
        country: 'Norway',
        company: 'Rangoni Of Florence',
        date: '2023-01-15',
        status: 'new',
        verified: true,
        activity: 71,
        representative: 'Onyama Limba',
        balance: 58971
      },
      {
        id: 1012,
        name: 'Kiley Caldarera',
        country: 'Japan',
        company: 'Feiner Bros',
        date: '2022-05-09',
        status: 'proposal',
        verified: true,
        activity: 39,
        representative: 'Ivan Magalhaes',
        balance: 45388
      },
      {
        id: 1013,
        name: 'Graciela Ruta',
        country: 'Argentina',
        company: 'Buckley Miller & Wright',
        date: '2020-10-05',
        status: 'qualified',
        verified: false,
        activity: 47,
        representative: 'Stephen Shaw',
        balance: 78542
      },
      {
        id: 1014,
        name: 'Cammy Albares',
        country: 'Sweden',
        company: 'Rousseaux, Michael Esq',
        date: '2021-12-17',
        status: 'unqualified',
        verified: true,
        activity: 60,
        representative: 'Amy Elsner',
        balance: 69320
      }
    ];
    
  }

 

  showDialog(customer?: any) {
    this.addPopupVisible = true;

    if (customer) {
      this.isEdit = true;
      this.form.patchValue({
        email: customer.email,
        password: customer.password,
        address: customer.address,
        address2: customer.address2,
        city: customer.city,
        state: customer.state,
        zip: customer.zip,
        check: customer.check || false
      });
    } else {
      this.isEdit = false;
      this.form.reset();
    }
  }

  onSubmit() {
    // if (this.form.valid) {
      if (this.isEdit) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Succesfully' });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Succesfully' });
      }
      this.addPopupVisible = false;
    //}
   }

  delete(event: Event , id:number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}


description = '';
recognition: any;
isRecording = false;
language = 'en-US';

startRecording() {
  const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  this.recognition = new SpeechRecognitionConstructor();
  this.recognition.lang = this.language;
  this.recognition.interimResults = true; // important to get results while recording
  this.recognition.continuous = true;     // optional, for long recording sessions

  this.recognition.onresult = (event: any) => {
    let finalTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      }
    }
    this.description += finalTranscript;
  };
  

  this.recognition.onerror = (event: any) => {
    console.error('Speech recognition error', event);
    this.isRecording = false;
  };

  this.recognition.onend = () => {
    this.isRecording = false;
  };

  this.recognition.start();
  this.isRecording = true;
}

stopRecording() {
  if (this.recognition) {
    this.recognition.stop();
    this.isRecording = false;
  }
}

changeLanguage() {
  if (this.recognition) {
    this.recognition.lang = this.language;
  }
}

speakText() {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(this.description);
  utterance.lang = this.language;
  synth.speak(utterance);
}
}