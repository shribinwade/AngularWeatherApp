import { Component,OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  myWeather:any;
  
  temp:number=0;

  humidity: number=0;

  pressure:number=0;

  summary:string="";

  cityName:string="Pune";
  name:string="";
  iconURL:string='';
  constructor(private weatherService:WeatherService){

  }
  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName='';
  }
  onSubmbit(){
      this.getWeatherData(this.cityName);
      this.cityName='';
  }

  private getWeatherData(city:string=this.cityName){
    this.weatherService.getWeather(city).subscribe({
    
      next:(res)=>{
         console.log(res);
         this.myWeather=res;
         this.name=this.myWeather.name;
         
         this.temp=this.myWeather.main.temp;
         this.humidity=this.myWeather.main.humidity;
         this.pressure=this.myWeather.main.pressure;
         this.summary=this.myWeather.weather[0].main;
         this.iconURL='https://openweathermap.org/img/wn/'+this.myWeather.weather[0].icon+'@2x.png';
     },
  
     error:(error) => console.log(error.message),
  
     complete: ()=>  console.log('API call completed')
    
    })
  }
}
