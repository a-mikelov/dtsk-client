export interface ProductAttributesInterface {
  name: string
  description: string
  price: string
  type: string
  slug: string
}

export interface ProductInterface {
  id: number
  attributes: ProductAttributesInterface
}
