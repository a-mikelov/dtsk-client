export interface ProductInterface {
  id: number,
  attributes: {
    title: string,
    description: string,
    price: string,
    type: number,
    slug: string,
  }
}
