import {ImageInterface} from '../types/image.interface'

export interface ServicesAttributesInterface {
  name: string
  description: string
  price: string
  banner: boolean
  slug: string
  image: ImageInterface | null
  contentPosition: string
  justifyItems: string
}

export interface ServiceInterface {
  id: number
  attributes: ServicesAttributesInterface
}
