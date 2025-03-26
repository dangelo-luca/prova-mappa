import { Component } from '@angular/core';
import {
  Map,
  MapOptions,
  tileLayer,
  latLng,

} from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mappa';

  mouseX: number = 0;
  mouseY: number = 0;
  options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 0.7,
        maxZoom: 19,
        detectRetina: true,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
    zoom: 19,
    center: latLng(45.464211, 9.191383),
    
  };
  public map: Map | undefined;
  public zoom: number | undefined; 

  onMapReady(map: Map) {
    this.map = map;
    this.map.on('click', (e) => {
      var coord = e.latlng;
      var lat = coord.lat;
      var lng = coord.lng;
    });
  }

}
