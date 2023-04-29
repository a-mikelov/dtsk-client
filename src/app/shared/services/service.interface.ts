import {ImageInterface} from '../types/image.interface'

export interface ServicesAttributesInterface {
  name: string
  description: string
  price: string
  banner: boolean
  slug: string
  image: ImageInterface | null
}

export interface ServiceInterface {
  id: number
  attributes: ServicesAttributesInterface
}
