import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }
  mockapi: string = "https://6380f4bf786e112fe1bf0f9a.mockapi.io/getData"
  url = 'https://retailassist-poc.kore.ai/semanticSearch/getAvaibleIndexProperties';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3RJZCI6InN0LWQwMjc4ZjE4LTIyMjgtNWQ2Zi04MjUwLWEyZTJiMTRjYmQyMSIsInByb2plY3RBY2Nlc3MiOiJTRU1BTlRJQ19TRUFSQ0giLCJpYXQiOjE2OTIyNTQzNzB9.srlH3yS76oO0k3V_sBiN58U-WzYETg2_YW70_cyz7RQ",
      "Stage": "Dev"
    })
  };
  getData(): any {
    return this.http.get(this.mockapi, this.httpOptions).pipe(map((data: any) => {
      return data[0];
      if (data?.length == 0) return data[0];
      return data;
    }));
  }

  createIndex(indexData: any) {
    return this.http.put<any>(this.mockapi + '/0', indexData);
  }

}


