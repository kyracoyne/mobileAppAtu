import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

// What favourite data fields we will store from the json 
export type FavouriteRecipe = {
  id: number;
  title: string;
  image: string;
};

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  // Key identifier for the favourites 
  private readonly KEY = 'favourites';
  // Method to get the users favourited recipes from storage 
  async getAllFavourites(): Promise<FavouriteRecipe[]> {
    // Read the stored values from capacitor preferences
    const result = await Preferences.get({ key: this.KEY });
    // If something was stored under this key, get and parse the json string, else retrun empty array 
    if (result.value) {
      const favourites = JSON.parse(result.value) as FavouriteRecipe[]; 
      return favourites;   
    } else {    
      return [];  
    }
  }

  // Save the full favourites array as json string to storage against favourites key 
  private async saveAllFavourites(faves: FavouriteRecipe[]): Promise<void> {
    await Preferences.set({
      key: this.KEY,
      value: JSON.stringify(faves),
    });
  }

 // Add to favourites method with validation for duplicates
 async addToFavourites(recipe: FavouriteRecipe): Promise<void> {
    // Get the current list of favourites (so we can check if already added)
    const favourites = await this.getAllFavourites();
    let alreadyExists = false; 
    for (const fav of favourites) {
      if (fav.id === recipe.id) {
        alreadyExists = true;
        break;
      }
    }
    // Add to favourites if not already present 
    if (!alreadyExists) {
      favourites.push(recipe);
      // Save back to storage
      await this.saveAllFavourites(favourites);
    } 
  }

  // Remove recipe from favourites 
  async removeFromFavourites(id: number): Promise<void> {
    // Get the current list of favourites (so we can check if already added)
    const favourites = await this.getAllFavourites();
    // Create new array with all except for the one we want to remove
    const updatedFavourites: FavouriteRecipe[] = [];
    for (const fave of favourites) {
      if (fave.id !== id) {
        updatedFavourites.push(fave);
      }
    }
    await this.saveAllFavourites(updatedFavourites);
  }

  // Check if a recipe is already in favourites
  async isFavourite(id: number): Promise<boolean> {
    const favourites = await this.getAllFavourites();
    for (const fave of favourites) {
      if (fave.id === id) {
        return true;
      }
    }
    return false;
  }
  
}