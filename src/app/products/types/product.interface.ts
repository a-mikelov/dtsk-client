interface AttributesInterface {
  title: string,
  description: string,
  price: string,
  type: string,
  slug: string,
}


export interface ProductInterface {
  id: number,
  attributes: AttributesInterface
}
