import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonImg } from '@ionic/angular/standalone';
import { SpoonacularService } from '../services/spoonacular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonImg ],
})
export class HomePage {
  ingredients: string = '';
  lastSearch: string = '';
  recipes: any[] = [];
  errorMsg: string = '';

  constructor(private spoon: SpoonacularService){}

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
}