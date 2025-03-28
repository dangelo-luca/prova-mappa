import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Icon, icon } from "leaflet";


interface Evento {
  title: string;
  details: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
}

interface EventYear {
  year: number;
  eventi_anno: Evento[];
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  
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

  
  
  events: EventYear[] = [
    {
      year: 1969,
      eventi_anno: [
        { 
          title: 'Strage di Piazza Fontana', 
          details: '12 dicembre: Bomba nella Banca Nazionale dell\'Agricoltura a Milano. 17 morti.',
          location: { name: 'Milano, Piazza Fontana', lat: 45.4642, lng: 9.1898 }
        }
      ]
    },
    {
      year: 1970,
      eventi_anno: [
        { 
          title: 'Golpe Borghese', 
          details: '7-8 dicembre: Tentativo di colpo di Stato fallito.',
          location: { name: 'Roma', lat: 41.9028, lng: 12.4964 }
        }
      ]
    },
    {
      year: 1972,
      eventi_anno: [
        { 
          title: 'Strage di Peteano', 
          details: '31 maggio: Autobomba a Peteano (Gorizia), 3 carabinieri uccisi.',
          location: { name: 'Peteano, Gorizia', lat: 45.9021, lng: 13.3833 }
        }
      ]
    },
    {
      year: 1973,
      eventi_anno: [
        { 
          title: 'Strage della Questura di Milano', 
          details: '17 maggio: Attentato anarchico di Gianfranco Bertoli, 4 morti.',
          location: { name: 'Milano, Questura', lat: 45.4700, lng: 9.1905 }
        }
      ]
    },
    {
      year: 1974,
      eventi_anno: [
        { 
          title: 'Strage di Piazza della Loggia', 
          details: '28 maggio: Attentato neofascista a Brescia, 8 morti.',
          location: { name: 'Brescia, Piazza della Loggia', lat: 45.5419, lng: 10.2111 }
        },
        { 
          title: 'Strage dell\'Italicus', 
          details: '4 agosto: Attentato sul treno Roma-Brennero, 12 morti.',
          location: { name: 'San Benedetto Val di Sambro, Bologna', lat: 44.2391, lng: 11.3572 }
        }
      ]
    },
    {
      year: 1977,
      eventi_anno: [
        { 
          title: 'Omicidio di Francesco Lorusso', 
          details: '11 marzo: Studente ucciso a Bologna durante scontri tra studenti e polizia.',
          location: { name: 'Bologna', lat: 44.4949, lng: 11.3426 }
        }
      ]
    },
    {
      year: 1978,
      eventi_anno: [
        { 
          title: 'Rapimento e morte di Aldo Moro', 
          details: '16 marzo: Rapimento da parte delle Brigate Rosse. 9 maggio: Ritrovato morto in via Caetani.',
          location: { name: 'Roma, Via Caetani', lat: 41.8922, lng: 12.4865 }
        }
      ]
    },
    {
      year: 1980,
      eventi_anno: [
        { 
          title: 'Strage della Stazione di Bologna', 
          details: '2 agosto: Bomba alla stazione di Bologna, 85 morti.',
          location: { name: 'Bologna, Stazione Centrale', lat: 44.5051, lng: 11.3417 }
        }
      ]
    },
    {
      year: 1981,
      eventi_anno: [
        { 
          title: 'Scoperta della lista P2', 
          details: '17 marzo: Scoperta della loggia massonica P2, coinvolta in trame eversive.',
          location: { name: 'Roma', lat: 41.9028, lng: 12.4964 }
        }
      ]
    },
    {
      year: 1982,
      eventi_anno: [
        { 
          title: 'Omicidio del generale Dalla Chiesa', 
          details: '3 settembre: Carlo Alberto Dalla Chiesa ucciso a Palermo dalla mafia.',
          location: { name: 'Palermo', lat: 38.1157, lng: 13.3615 }
        }
      ]
    },
    {
      year: 1984,
      eventi_anno: [
        { 
          title: 'Strage del Rapido 904', 
          details: '23 dicembre: Bomba sul treno Napoli-Milano, 16 morti.',
          location: { name: 'San Benedetto Val di Sambro, Bologna', lat: 44.2391, lng: 11.3572 }
        }
      ]
    },
    {
      year: 1988,
      eventi_anno: [
        { 
          title: 'Omicidio di Roberto Ruffilli', 
          details: '16 aprile: Professore ucciso dalle Brigate Rosse a Forlì.',
          location: { name: 'Forlì', lat: 44.2236, lng: 12.0406 }
        }
      ]
    }
  ];

  selectedEvent: EventYear | null = null;
  preview: any = null;
  marker: L.Marker | null = null;

  
    
  
  selectEvent(event: EventYear) {
    this.selectedEvent = event;
    this.preview = null; 

    if (this.map && event.eventi_anno.length > 0) {
      const { lat, lng, name } = event.eventi_anno[0].location;

      // Rimuove il vecchio marker se presente
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }

      // Aggiunge il nuovo marker
      this.marker = L.marker([lat, lng]).addTo(this.map)
        .bindPopup(`<b>${event.eventi_anno[0].title}</b><br>${name}`)
        .openPopup();

      // Centra la mappa sulla posizione
      this.map.setView([lat, lng], 10);
    }
  }

  closeDetails() {
    this.selectedEvent = null;
  }

  onMouseOver(event: EventYear) {
    const firstEvent = event.eventi_anno[0];
    const previewText = firstEvent.details.length > 50 ? firstEvent.details.substring(0, 50) + '...' : firstEvent.details;

    this.preview = {
      year: event.year,
      previewText: previewText
    };
  }

  onMouseOut() {
    this.preview = null;
  }
}
