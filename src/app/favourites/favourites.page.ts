import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonImg } from '@ionic/angular/standalone';
import { FavouritesService, FavouriteRecipe } from '../services/favourites';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonImg, CommonModule, FormsModule]
})

export class FavouritesPage implements OnInit {
  favourites: FavouriteRecipe[] = [];
  constructor(private favouritesService: FavouritesService) {}
  // Load saved favourites
  async ngOnInit() {
    await this.loadFavourites();
  }
  async ionViewWillEnter() {
    await this.loadFavourites();
  }
  private async loadFavourites() {
    this.favourites = await this.favouritesService.getAllFavourites();
    console.log('Loaded favourites = ', this.favourites);
  }
}