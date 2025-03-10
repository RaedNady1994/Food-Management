import { ICategoriesResponse } from '../categories/interfaces/icategory';

export interface IRecipesResponse {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  creationDate: string;
  modificationDate: string;
  category: ICategoriesResponse[];
  tag: ITagsResponse;
}

export interface IGetRecipesRequest {
  pageNumber: number;
  pageSize: number;
  name?: string;
  tagId?: number | null ;
  categoryId?: number | null ;
}

export interface ITagsResponse {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}
