import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { api } from '../../../api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sheetspi';
  result = '';

  constructor(protected httpClient: HttpClient) { }

  post() {
    this.httpClient.post('https://script.google.com/macros/s/AKfycbwC4dGDqixRvXo7JlJMa2A3HZVQO3ZwL3LfUh485yksoLvTx2Pdy9vo/exec',
      JSON.stringify(api.sayHi.request({ name: 'Angular' }))
    ).subscribe({
      next: (data: typeof api.sayHi.responseType) => {
        this.result = data.greeting
      }
    });
  }
}
