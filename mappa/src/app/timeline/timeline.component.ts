import { ChangeDetectorRef, Component } from '@angular/core';
import * as L from 'leaflet';
import {LeafletEvent} from 'leaflet'
import { Icon, icon } from 'leaflet';

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

  mostraCard: boolean = false;
  eventoSelezionato: Evento | null = null;

  constructor(private cd:ChangeDetectorRef){}

  toggleCard(): void {
    this.mostraCard = !this.mostraCard;
  }


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

  map: L.Map | undefined;
  markersLayer = new L.LayerGroup();

  private highlightIcon: Icon = icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [30, 40],
    iconAnchor: [15, 40]
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
          title: 'Attentato alla banca dell\'Agricoltura', 
          details: '8 febbraio: Attentato neofascista a Milano, esplosione in una filiale della Banca dell\'Agricoltura.',
          location: { name: 'Milano, Via Manzoni', lat: 45.4669, lng: 9.1903 }
        }
      ]
    },
    {
      year: 1972,
      eventi_anno: [
        { 
          title: 'Attentato al Commissariato di Porta Romana', 
          details: '17 luglio: Attentato da parte di un gruppo di estremisti di sinistra, 2 poliziotti feriti.',
          location: { name: 'Milano, Porta Romana', lat: 45.4456, lng: 9.1948 }
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
        },
        { 
          title: 'Attentato alla sede del Corriere della Sera', 
          details: '28 gennaio: Esplosione dinamitarda contro la sede del quotidiano, nessun morto ma danni ingenti.',
          location: { name: 'Milano, Corriere della Sera', lat: 45.4653, lng: 9.1911 }
        }
      ]
    },
    {
      year: 1974,
      eventi_anno: [
        { 
          title: 'Attentato alla Camera del Lavoro', 
          details: '25 marzo: Esplosione di una bomba, 2 feriti gravi.',
          location: { name: 'Milano, Camera del Lavoro', lat: 45.4677, lng: 9.1917 }
        }
      ]
    },
    {
      year: 1977,
      eventi_anno: [
        { 
          title: 'Scontri tra studenti e polizia', 
          details: '28 aprile: Scontri tra studenti di sinistra e polizia, un giovane ucciso durante le manifestazioni.',
          location: { name: 'Milano, Piazza San Babila', lat: 45.4750, lng: 9.1902 }
        }
      ]
    },
    {
      year: 1978,
      eventi_anno: [
        { 
          title: 'Tentativo di sequestro di un giudice', 
          details: '11 ottobre: Tentativo di rapimento del giudice Franco Cordero da parte di un gruppo di terroristi.',
          location: { name: 'Milano, Corso Venezia', lat: 45.4751, lng: 9.1915 }
        }
      ]
    },
    {
      year: 1980,
      eventi_anno: [
        { 
          title: 'Esplosione al quartiere Stazione Centrale', 
          details: '15 maggio: Esplosione che colpisce il quartiere della Stazione Centrale, 3 feriti.',
          location: { name: 'Milano, Stazione Centrale', lat: 45.4861, lng: 9.2046 }
        }
      ]
    },
    {
      year: 1981,
      eventi_anno: [
        { 
          title: 'Attentato a Roberto Fiore', 
          details: '23 aprile: Attentato a Roberto Fiore, leader di un movimento neofascista milanese, rimane gravemente ferito.',
          location: { name: 'Milano, Via Della Moscova', lat: 45.4774, lng: 9.1872 }
        }
      ]
    },
    {
      year: 1982,
      eventi_anno: [
        { 
          title: 'Attentato alla sede del Partito Comunista', 
          details: '2 giugno: Esplosione contro la sede del Partito Comunista Italiano, pochi danni e nessun ferito.',
          location: { name: 'Milano, Via Torino', lat: 45.4603, lng: 9.1889 }
        }
      ]
    },
    {
      year: 1984,
      eventi_anno: [
        { 
          title: 'Attentato alla sede di Lotta Continua', 
          details: '14 ottobre: Bombardamento della sede di Lotta Continua a Milano, nessun morto.',
          location: { name: 'Milano, Via Brera', lat: 45.4716, lng: 9.1893 }
        }
      ]
    },
    {
      year: 1988,
      eventi_anno: [
        { 
          title: 'Esplosione contro la sede della CGIL', 
          details: '7 novembre: Attentato contro la sede della CGIL, danni ma nessun morto.',
          location: { name: 'Milano, Via Tiziano', lat: 45.4675, lng: 9.1881 }
        }
      ]
    }
  ];


  onMapReady(map: L.Map) {
    this.map = map;
    map.addLayer(this.markersLayer);
  }

  selectEvent(event: EventYear) {
    if (!this.map) return;
  
    this.map.setView([this.initialView.lat, this.initialView.lng], this.initialView.zoom);
    this.markersLayer.clearLayers();
  
    event.eventi_anno.forEach(ev => {
      const marker = L.marker([ev.location.lat, ev.location.lng], { icon: this.highlightIcon })
        .bindPopup(`<b>${ev.title}</b><br>${ev.location.name}`)
        .on('click', () => this.onclick(ev));  // Passiamo direttamente l'evento 'ev'
      
      this.markersLayer.addLayer(marker);
    });
  }
  

  // Quando si clicca su un marker, mostra la card con i dettagli
  onclick(ev: Evento) {
    this.eventoSelezionato = ev;  // Aggiorniamo la variabile eventoSelezionato
    this.mostraCard = true;       // Mostriamo la card

    setTimeout(() => {
      this.cd.detectChanges();
    });
   
  }

  chiudiCard() {
    this.mostraCard = false;
    this.eventoSelezionato = null;
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }
  
  
}
