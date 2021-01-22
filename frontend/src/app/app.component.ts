import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sheetspi';
  result = '';

  constructor(protected httpClient: HttpClient) { }

  get() {
    this.httpClient.get('https://script.google.com/macros/s/AKfycbwC4dGDqixRvXo7JlJMa2A3HZVQO3ZwL3LfUh485yksoLvTx2Pdy9vo/exec', {
      params: {
        name: 'Martin'
      }
    }).subscribe({
      next: data => {
        this.result = new Date().toString() + '' + JSON.stringify(data)
      }
    });
  }

  post() {
    this.httpClient.post('https://script.google.com/macros/s/AKfycbwC4dGDqixRvXo7JlJMa2A3HZVQO3ZwL3LfUh485yksoLvTx2Pdy9vo/exec',
      JSON.stringify({ name: 'Martin' })
    ).subscribe({
      next: data => {
        this.result = new Date().toString() + '' + JSON.stringify(data)
      }
    });
  }
}
