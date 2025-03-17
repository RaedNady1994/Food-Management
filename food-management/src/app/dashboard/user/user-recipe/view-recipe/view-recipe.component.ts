import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRecipesResponse } from 'src/app/dashboard/admin/modules/recipes/iRecipe';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss'],
})
export class ViewRecipeComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRecipesResponse
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  getCategoryNames(): string {
    return this.data.category?.length 
      ? this.data.category.map(cat => cat.name).join(', ') 
      : 'N/A';
  }

  getTagName(): string {
    return this.data.tag ? this.data.tag.name : 'N/A';
  }
}
