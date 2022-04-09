import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
  speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/';
  speciesCurrent = '';
  details: any;
  pokemon = [];
  imgPokemonSelected = '';
  constructor(private route: ActivatedRoute,
              private service: ApiServiceService) { }

  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('index');
    this.service.getPokemonDetails(index).subscribe(details => {
      console.log('Details: ', details);
      this.details = details;
    });
    this.imgPokemonSelected = this.imageUrl + index + '.png';
  }
}

