import { Injectable } from '@angular/core';
import {CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class SpoonacularService {
  private APIKEY = '70759a4f7911402abcc53d3c51d3b759';
  private APIURL = 'https://api.spoonacular.com/recipes';

  // For recipe search
  getRecipesByIngredients(ingredients: string) {
    const options: HttpOptions = {
      url: `${this.APIURL}/findByIngredients`,
      params: {
        ingredients,
        number: '5',
        apiKey: this.APIKEY
      }
    };
    return CapacitorHttp.get(options);
  }

  // For recipe details 
  getRecipeDetailsById(id: number, unit: 'metric' | 'us') {
    const options: HttpOptions = {
      url: `${this.APIURL}/${id}/information`,
      params: {
        apiKey: this.APIKEY,
        units: unit,
      }
    };
    return CapacitorHttp.get(options);
  }

}
