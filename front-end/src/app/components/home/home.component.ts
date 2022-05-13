import { Component, OnInit } from '@angular/core';
import { ServicesService } from "../services/services.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  videoInformation:any = {
    urlYt:'',
    qualityVideo:''
  }

  value:any = ''

  constructor(private service: ServicesService) { }

  ngOnInit(): void {
  }

  video(){
    this.service.downloadvideo(this.videoInformation).subscribe(res=>{

    }, err=>console.log)
  }


}
