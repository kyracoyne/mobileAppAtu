import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel, IonThumbnail } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { SpoonacularService } from '../services/spoonacular';
import { Router } from '@angular/router'; // added for back button
import { arrowBackOutline, heartOutline } from 'ionicons/icons'; // added for back and favourite buttons
import { FavouritesService, FavouriteRecipe } from '../services/favourites';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonImg, IonList, IonItem, IonLabel, IonThumbnail, CommonModule, FormsModule]
})
export class RecipeDetailsPage implements OnInit {
  recipeId: number = 0;
  recipe: any = null;
  errorMsg: string = '';
  arrowBackOutline = arrowBackOutline;
  heartOutline = heartOutline;
  constructor(
    private route: ActivatedRoute,
    private spoon: SpoonacularService,
    private router: Router,
    private favouritesService: FavouritesService
  ) {}

  ngOnInit() {
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Recipe ID:', this.recipeId);

    this.errorMsg = '';
    this.recipe = null;

    this.spoon.getRecipeDetailsById(this.recipeId)
      .then(response => {
        console.log('Recipe details raw response:', response);
        console.log('Recipe details data:', response.data);
        this.recipe = response.data;
      })
      .catch(err => {
        console.error('Recipe details error:', err);
        this.errorMsg = 'Failed to fetch recipe details.';
      });
  }

  getIngredientImageUrl(imageFileName: string): string {
    return `https://img.spoonacular.com/ingredients_100x100/${imageFileName}`;
  }

  // Maybe obvious, but method for back button to get back to home page from recipe 
  goBackHome() {
    this.router.navigate(['/home']);
  }

  // Method tied to favourites button to save the recipe to storage 
  async onAddToFavouritesClicked(): Promise<void> {
    // Build the object to store
    const fave: FavouriteRecipe = {
      id: this.recipe.id,
      title: this.recipe.title,
      image: this.recipe.image
    };
    // Save it via the service
    await this.favouritesService.addToFavourites(fave);
    console.log('Saved to favourites = ', fave);
  }

}
