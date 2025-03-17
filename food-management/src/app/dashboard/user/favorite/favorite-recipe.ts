import { IRecipesResponse } from "../../admin/modules/recipes/iRecipe";

export interface FavoriteRecipe {
    id: number;
    creationDate: string;
    recipe: IRecipesResponse;
  }