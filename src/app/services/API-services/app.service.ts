import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }

  getData(): any {
    const url = 'https://retailassist-poc.kore.ai/semanticSearch/getAvaibleIndexProperties';

    // const mockapi = "https://6380f4bf786e112fe1bf0f9a.mockapi.io/getData"
    // const localhost = "http://localhost:3016/semanticSearch/getAvaibleIndexProperties"

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3RJZCI6InN0LWQwMjc4ZjE4LTIyMjgtNWQ2Zi04MjUwLWEyZTJiMTRjYmQyMSIsInByb2plY3RBY2Nlc3MiOiJTRU1BTlRJQ19TRUFSQ0giLCJpYXQiOjE2OTIyNTQzNzB9.srlH3yS76oO0k3V_sBiN58U-WzYETg2_YW70_cyz7RQ",
        "Stage": "Dev"
      })
    };
    return this.http.get(url, httpOptions).pipe(map((data: any) => {
      return data[0];
    }));
  }

  createIndex(indexData: any) {
    return this.http.put<any>("https://6380f4bf786e112fe1bf0f9a.mockapi.io/getData/0", indexData);
  }

}


