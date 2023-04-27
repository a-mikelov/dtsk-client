import {ProductInterface} from "./product.interface";

export interface GetProductsResponseInterface {
  data: ProductInterface[],
  meta: {
    pages: string,
    count: number
  }
}
