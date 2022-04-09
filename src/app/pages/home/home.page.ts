import { Component, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  offset = 0;
  pokemon = [];
  details: any;
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  constructor(private service: ApiServiceService, 
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadPokemons();
  }
  loadPokemons(loadMore = false, event?) {
    if(loadMore) {
      this.offset += 25;
    }
    this.service.getPokemons(this.offset).subscribe( res => {
      
      this.pokemon = [...this.pokemon, ...res];
      console.log('results: ', this.pokemon);
      
      if(event) {
        event.target.complete();
      }
      if(this.offset > 125) {
        this.infinite.disabled = true;
      }
    });
  }
  onSearchChange(e) {
    let value = e.detail.value;
    if(value == '') {
      this.offset = 0;
      this.loadPokemons();
      return;
    }
    
    this.service.findPokemon(value).subscribe(res => {
      this.pokemon = [res];
    },err => {
      this.pokemon = [];
    })

  }
}