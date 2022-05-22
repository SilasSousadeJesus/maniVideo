import { Component, OnInit } from '@angular/core';
import { ServicesService } from "../services/services.service";
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";


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
  fullUrl: string | null = '';
  fullUrlview: SafeResourceUrl= "";

  constructor(private service: ServicesService,
              private formBuilder: FormBuilder,
              private _sanitizer: DomSanitizer
              ) { }

  ngOnInit(): void {
  }


  securefullurl(){
    this.fullUrl = this._sanitizer.sanitize(4, `https://www.youtube.com/embed/${this.videoId}`)
    return this.fullUrl
  }

  securefullurlview(){
    this.fullUrlview = this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
    return this.fullUrlview
  }


  video(){
    this.formVideo.controls['urlYt'].setValue(this.securefullurl())
   this.service.downloadvideo(this.formVideo.value).subscribe(res=>{
      console.log(res, this.formVideo.value)
   }, err=>console.log)
 }



}
