import { Component, OnInit } from '@angular/core';
import { ServicesService } from "../services/services.service";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from "@angular/platform-browser";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formVideo = this.formBuilder.group({

    urlYt:['', Validators.required],
    qualityVideo:['', Validators.required]

  })

  formMP3 = this.formBuilder.group({

    urlYt:['', Validators.required]

  })

  videoId:any = '';
  fullUrl: string | null  = '';

  constructor(private service: ServicesService,
              private formBuilder: FormBuilder,
              private _sanitizer: DomSanitizer
              ) { }

  ngOnInit(): void {
  }


  //  video(){
  //    this.service.downloadvideo(this.formVideo.value).subscribe(res=>{
  //       this.formVideo = res
  //    }, err=>console.log)
  //  }

  securefullurl(){
    this.fullUrl = this._sanitizer.sanitize(4, `https://www.youtube.com/embed/${this.videoId}`)
    return this.fullUrl
  }



  saveForm(){
    console.log(this.fullUrl)
    this.formVideo.controls['urlYt'].setValue(this.securefullurl())
    console.log(this.formVideo.value)
  }

  // https://www.youtube.com/watch?v=letmVxvyvig

}
