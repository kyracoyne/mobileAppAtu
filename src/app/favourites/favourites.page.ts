import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonImg, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { FavouritesService, FavouriteRecipe } from '../services/favourites';
import { Router } from '@angular/router'; // for routing back to recipe from favourites 
import { trashBinOutline } from 'ionicons/icons'; // Remove recipe from favourites on favourites page
import { arrowBackOutline } from 'ionicons/icons'; // Add navigation back to home page 

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonImg, IonButton, IonButtons, IonIcon, CommonModule, FormsModule]
})

export class FavouritesPage implements OnInit {
  favourites: FavouriteRecipe[] = [];
  trashBinOutline = trashBinOutline;
  arrowBackOutline = arrowBackOutline; 
  constructor(
    private favouritesService: FavouritesService,
    private router: Router
  ) {}
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
  // To navigate back to recipe details from favourites 
  openRecipeDetails(recipeID: number): void {
    console.log('Navigating to recipe from favourites. RecipeID = ', recipeID);
    this.router.navigate(['/recipe-details', recipeID]);
  }
  async removeFavourite (id: number): Promise<void>{
    await this.favouritesService.removeFromFavourites(id);
    await this.loadFavourites();
  }
  // For back button to get back to home page from favourites 
  goBackHome() {
    this.router.navigate(['/home']);
  }
}