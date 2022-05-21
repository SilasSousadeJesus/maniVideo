import { Component, OnInit } from '@angular/core';
import { ServicesService } from "../services/services.service";
import { FormBuilder } from '@angular/forms';

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

  ulrLink:String = ''

  constructor(private service: ServicesService,
              private formBuilder: FormBuilder
              ) { }

  ngOnInit(): void {
  }

  video(){
    this.service.downloadvideo(this.formVideo.value).subscribe(res=>{

    }, err=>console.log)
  }


}
