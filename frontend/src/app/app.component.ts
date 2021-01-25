import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { api, ApiAction } from '../../../api/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sheetspi';
  result = '';

  constructor(protected httpClient: HttpClient) { }

  sayHi() {
    this.request(
      api.sayHi.request({ name: 'Angular' })
    ).subscribe({
      next: (data: typeof api.sayHi.responseType) => {
        this.result = data.greeting
      }
    });
  }

  getLogs() {
    this.request(
      api.getLogs.request({ skip: 2, top: 4 })
    ).subscribe({
      next: (data: typeof api.getLogs.responseType) => {
        this.result = JSON.stringify(data)
      }
    });
  }

  getLog() {
    this.request(
      api.getLog.request('4')
    ).subscribe({
      next: (data: typeof api.getLog.responseType) => {
        this.result = JSON.stringify(data)
      }
    });
  }

  createLog() {
    this.request(
      api.createLog.request({ message: new Date().getMilliseconds().toString() })
    ).subscribe({
      next: (data: typeof api.createLog.responseType) => {
        this.result = JSON.stringify(data)
      }
    });
  }

  firestore() {
    this.httpClient.get('https://script.google.com/macros/s/AKfycbwC4dGDqixRvXo7JlJMa2A3HZVQO3ZwL3LfUh485yksoLvTx2Pdy9vo/exec').subscribe({
      next: (data) => {
        this.result = JSON.stringify(data)
      }
    });
  }

  private request<T>(action: ApiAction<T>): Observable<unknown> {
    return this.httpClient.post('https://script.google.com/macros/s/AKfycbwC4dGDqixRvXo7JlJMa2A3HZVQO3ZwL3LfUh485yksoLvTx2Pdy9vo/exec',
      JSON.stringify(action)
    );
  }
}
