import { ChangeDetectorRef, Component } from '@angular/core';
import * as L from 'leaflet';
import { OnInit } from '@angular/core';
import { LatLngExpression } from 'leaflet';

interface Event {
  id: number;
  title: string;
  year: number;
  date: string;
  location: string;
  latitude: number;
  longitude: number;
  details: string;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  events: Event[] = []; // Dati degli eventi
  eventoSelezionato: Event | null = null; // Evento selezionato
  mostraCard: boolean = false; // Stato della card
  options: any; // Opzioni per la mappa
  
  constructor() { }

  ngOnInit(): void {
    this.fetchEvents(); // Carica gli eventi
    this.initMap(); // Inizializza la mappa
  }

  // Funzione per inizializzare la mappa
  initMap(): void {
    this.options = {
      center: [45.4642, 9.1900], // Posizione iniziale della mappa (Milano)
      zoom: 12,
    };
  }

  // Funzione per recuperare gli eventi dal backend
  async fetchEvents(): Promise<void> {
    try {
      const response = await fetch('http://localhost:5001/events'); // URL del tuo backend
      if (!response.ok) {
        throw new Error('Impossibile recuperare gli eventi');
      }
      const data = await response.json();
      this.events = data;
    } catch (error) {
      console.error('Errore nel recuperare gli eventi:', error);
    }
  }

  // Funzione per selezionare un evento dalla linea temporale
  selectEvent(event: Event): void {
    this.eventoSelezionato = event;
    this.mostraCard = true; // Mostra la card
  }

  // Funzione per chiudere la card
  chiudiCard(): void {
    this.mostraCard = false;
    this.eventoSelezionato = null;
  }

  // Callback per quando la mappa è pronta (per aggiungere i marker)
  onMapReady(map: any): void {
    this.events.forEach(event => {
      const marker = L.marker([event.latitude, event.longitude]).addTo(map);
      marker.bindPopup(`
        <h3>${event.title}</h3>
        <p>${event.date}</p>
        <p>${event.location}</p>
      `);
    });
  }
}
