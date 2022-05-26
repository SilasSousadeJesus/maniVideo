import { Component, OnInit } from '@angular/core';
import { ServicesService } from "../services/services.service";
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  durationInSeconds = 5;

  msgError:any = "";

  formVideo = this.formBuilder.group({

    urlYt:['', Validators.required],
    id:['', Validators.required],
    qualityVideo:['', Validators.required]

  })

  formMP3 = this.formBuilder.group({

    urlYt:['', Validators.required]

  })

  videoId:any = '';
  fullUrl: string | null = '';
  fullUrlview: SafeResourceUrl = "";

  constructor(private service: ServicesService,
              private formBuilder: FormBuilder,
              private _sanitizer: DomSanitizer,
              private _snackBar: MatSnackBar
              ) { }

  ngOnInit(): void {
  }

  popUp(message:string){
      this._snackBar.open(message, 'Ok', {
        duration: 2500
      })
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
    this.formVideo.controls['id'].setValue(this.videoId)

   this.service.downloadvideo(this.formVideo.value).subscribe(res=>{

    this.msgError = res.message
    if(this.msgError === "invalid ID"){
        return this.popUp("ID invalido!")
      }
      if(res === "invalid URL"){
        return this.popUp("Url invalido!")
      }
      this.popUp("O Download foi iniciado!")
   }, err=>console.log(err))
 }

}
