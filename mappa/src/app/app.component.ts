import { Component } from '@angular/core';
import {
  Map,
  Control,
  DomUtil,
  ZoomAnimEvent,
  Layer,
  MapOptions,
  tileLayer,
  latLng,
  LeafletEvent,
  icon,
  marker,
  LatLng,
  Icon,
  IconOptions,
  MarkerOptions,
  LayerOptions,
  Marker,
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
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | undefined;
  @Output() map$: EventEmitter<Map> = new EventEmitter();
  @Output() zoom$: EventEmitter<number> = new EventEmitter();
  @Input() options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 0.7,
        maxZoom: 19,
        detectRetina: true,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
    zoom: 15,
    center: latLng(-22.37855150766163, -41.778323650360115),
  };
  public map: Map | undefined;
  public zoom: number | undefined;
  markerIconBlue = icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    // specify the path here
    iconUrl:
      'https://raw.githubusercontent.com/raulmu/assets/main/marker-icon-blue.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
  }) as Icon<IconOptions>;
  markerIconRed = icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    // specify the path here
    iconUrl:
      'https://raw.githubusercontent.com/raulmu/assets/main/marker-icon-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
  }) as Icon<IconOptions>;
  markers: Marker[] = [];
  menuMarker: Marker | undefined;
  constructor() {}



}
