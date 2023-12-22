export type WpSite = {
  url: string|undefined;
  wpGraphqlUrl: string|undefined;
};


export type WpGraphQlSort = {
  fieldName: string,
  direction: string,
}


export type WpGraphQlRequest = {
  pageSize: number;
  categoryId?: number;
  status?: string;
  fields?: string[];
  orderBy?: WpGraphQlSort
}
