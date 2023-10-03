import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }

  getData(): any {
    const url = 'https://b71c-115-114-88-222.ngrok.io/semanticSearch/getAvaibleIndexProperties';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3RJZCI6InN0LWQwMjc4ZjE4LTIyMjgtNWQ2Zi04MjUwLWEyZTJiMTRjYmQyMSIsInByb2plY3RBY2Nlc3MiOiJTRU1BTlRJQ19TRUFSQ0giLCJpYXQiOjE2OTIyNTQzNzB9.srlH3yS76oO0k3V_sBiN58U-WzYETg2_YW70_cyz7RQ",
        "Stage": "Dev"
      })
    };
    return this.http.get(url, httpOptions);
  }
  createIndex(indexData: any) {
    return this.http.put<any>("https://6380f4bf786e112fe1bf0f9a.mockapi.io/getData/0", indexData);
  }

}


