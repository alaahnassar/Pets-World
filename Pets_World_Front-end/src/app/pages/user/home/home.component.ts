import { Component } from '@angular/core';
import { HomeServiceService } from 'src/app/core/services/user/HomeService/home-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  pet:any;

constructor(private _HomeService: HomeServiceService)
{

}

ngOnInit()
{
  this.getDogs();
}

getDogs()
{
  this._HomeService.getDogs({type:"dog"}).subscribe((data)=>
  {
    this.pet=data;
  })
}

getCats()
{
  this._HomeService.getDogs({type:"cat"}).subscribe((data)=>
  {
    this.pet=data;
  })
}

getBirds()
{
  this._HomeService.getDogs({type:"bird"}).subscribe((data)=>
  {
    this.pet=data;
  })
}


}
