import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  url = "http://localhost:3000";


  constructor(private http: HttpClient,
              ) { }

  downloadvideo(videoInformation:string[]){
    return this.http.post(`${this.url}/downloadVideo`, videoInformation)
  }

  getaudio(youtubeLink:string){
    return this.http.post(`${this.url}/downloadMp3`, youtubeLink)
  }


}
