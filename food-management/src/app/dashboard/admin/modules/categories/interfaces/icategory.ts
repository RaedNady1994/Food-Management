export interface ICategoriesResponse {
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string;
  }
  
  export interface IGetCategoriesRequest{
    page: number;
    size: number;
  }