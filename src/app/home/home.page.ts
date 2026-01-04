import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonImg } from '@ionic/angular/standalone';
import { SpoonacularService } from '../services/spoonacular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ CommonModule, FormsModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonImg ],
})
export class HomePage {
  ingredients: string = '';
  lastSearch: string = '';
  recipes: any[] = [];
  errorMsg: string = '';

  constructor(
    private spoon: SpoonacularService,
    private router: Router
  ){}

  // Run this function when the user clicks the Search button
  onSearchClicked() {
    this.lastSearch = this.ingredients;
    console.log('Ingredients entered:', this.ingredients);

    this.errorMsg = '';
    this.recipes = [];

    this.spoon.getRecipesByIngredients(this.ingredients)
      .then(response => {
        console.log('Spoonacular raw response:', response);
        console.log('Spoonacular data:', response.data);

        this.recipes = response.data;
      })
      .catch(err => {
        console.error('Spoonacular error:', err);
        this.errorMsg = 'Failed to fetch recipes.';
      });
  }

  // Navigation to favourites page from home page
  goToFavourites() {
    this.router.navigate(['/favourites']);
  }
}