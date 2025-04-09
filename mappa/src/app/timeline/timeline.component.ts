import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer, MapOptions, Map } from 'leaflet';
import * as L from 'leaflet';
import { Icon, icon } from 'leaflet';
import { Event } from '../models/event.models';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  events: Event[] = [];  // Eventi recuperati dal backend
  map: L.Map | undefined;
  markersLayer = new L.LayerGroup();

  private initialView = {
    lat: 45.4642,
    lng: 9.19,
    zoom: 11
  };

  options: L.MapOptions = {
    zoom: this.initialView.zoom,
    center: L.latLng(this.initialView.lat, this.initialView.lng),
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      })
    ]
  };

  private highlightIcon: Icon = icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [30, 40],
    iconAnchor: [15, 40]
  });

  constructor() {}

  ngOnInit(): void {
    this.fetchEvents();  // Carica gli eventi
  }

  // Recupera gli eventi dal backend
  async fetchEvents(): Promise<void> {
    try {
      const response = await fetch('https://dangeloluca-dbmappa-l0ykllyjb0b.ws-eu118.gitpod.io/events');
      const data = await response.json();
      this.events = data;  // Salva gli eventi
      this.addMarkers();  // Aggiungi marker sulla mappa dopo aver recuperato gli eventi
    } catch (error) {
      console.error('Errore nel recupero degli eventi:', error);
    }
  }

  // Aggiungi marker sulla mappa
  addMarkers(): void {
    this.events.forEach((event: Event) => {
      const marker = L.marker([event.latitude, event.longitude], { icon: this.highlightIcon })
        .addTo(this.markersLayer)
        .bindPopup(`<b>${event.title}</b><br>${event.details}`);
    });

    // Aggiungi il layer dei marker alla mappa
    if (this.map) {
      this.markersLayer.addTo(this.map);
    }
  }

  // Metodo chiamato quando la mappa è pronta
  onMapReady(map: Map): void {
    console.log('Mappa pronta:', map);
    this.map = map;  // Assegna l'istanza della mappa
    this.addMarkers();  // Aggiungi i marker alla mappa
  }

  selectEvent(event: Event): void {
    console.log('Evento selezionato:', event);
    // Puoi aggiungere logica per evidenziare un evento sulla mappa, se necessario
  }
}
