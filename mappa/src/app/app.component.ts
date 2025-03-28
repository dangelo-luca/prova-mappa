import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import { Icon, icon } from "leaflet";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "mappa";

  options: L.MapOptions = {
    zoom: 6,
    center: L.latLng(45.464211, 9.191383),
    layers: [
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
      })
    ]
  };

  map: L.Map | undefined;
  markersLayer = new L.LayerGroup();

  private defaultIcon: Icon = icon({
    iconUrl: "https://decisionfarm.ca/assets/images/marker-icon-2x.png",
    iconSize: [20, 30], // Dimensioni dell'icona
    iconAnchor: [20, 51] // Punto di ancoraggio
  });

  stations = [
    { id: "1", name: "Milano", lat: 45.464211, lng: 9.191383 },
    { id: "2", name: "Roma", lat: 41.902782, lng: 12.496366 },
    { id: "3", name: "Napoli", lat: 40.851775, lng: 14.268124 }
  ];

  createStations() {
    this.stations.forEach((s) => {
      const marker = L.marker([s.lat, s.lng], { icon: this.defaultIcon })
        .bindPopup(`<b>${s.name}</b>`) // Mostra il nome quando si clicca sul marker
        .addTo(this.markersLayer);
    });
  }

  onMapReady(map: L.Map) {
    this.map = map;
    map.addLayer(this.markersLayer);
    this.createStations();
  }

  ngOnInit(): void {}
}

