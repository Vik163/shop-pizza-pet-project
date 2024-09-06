export interface IAdditives {
   _id: string;
   image: string;
   title: string;
   price: number[];
}

export interface AdditivesSelect {
   card?: IAdditives;
   orderAdditives: string[];
}

export interface AdditivesSchema {
   isLoading?: boolean;
   error?: string;
   additives: IAdditives[];
   additivesSelect: AdditivesSelect | undefined;
}
