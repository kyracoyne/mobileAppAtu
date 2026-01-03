import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { SpoonacularService } from '../services/spoonacular';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonImg, CommonModule, FormsModule]
})
export class RecipeDetailsPage implements OnInit {
  recipeId: number = 0;
  recipe: any = null;
  errorMsg: string = '';
  constructor(
    private route: ActivatedRoute,
    private spoon: SpoonacularService
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

}
