import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  url = "http://localhost:3000";


  constructor(private http: HttpClient,
              ) { }

  downloadvideo(videoInformation:string[]):Observable<any>{
    return this.http.post(`${this.url}/downloadVideo`, videoInformation)
  }

  getaudio(youtubeLink:string):Observable<any>{
    return this.http.post(`${this.url}/downloadMp3`, youtubeLink)
  }


}
