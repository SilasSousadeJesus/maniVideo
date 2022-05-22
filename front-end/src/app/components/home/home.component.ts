import { Component, OnInit } from '@angular/core';
import { ServicesService } from "../services/services.service";
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeUrl, SafeHtml, SafeValue } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formVideo = this.formBuilder.group({

    urlYt:[''],
    qualityVideo:['']

  })

  formMP3 = this.formBuilder.group({

    urlYt:['']

  })

  videoId:any = '';
  fullUrl: string | null  = '';

  constructor(private service: ServicesService,
              private formBuilder: FormBuilder,
              private _sanitizer: DomSanitizer
              ) { }

  ngOnInit(): void {
  }

  video(){
    this.service.downloadvideo(this.formVideo.value).subscribe(res=>{

    }, err=>console.log)
  }

  securefullurl(){
    this.fullUrl = this._sanitizer.sanitize(4, `https://www.youtube.com/embed/${this.videoId}`)
    return this.fullUrl
  }

  saveForm(){
    console.log(this.formVideo.value)
    console.log(this.fullUrl)
  }

  // https://www.youtube.com/watch?v=letmVxvyvig

}
