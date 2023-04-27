import {ImageInterface} from "../types/image.interface";

export interface ServiceInterface {
  id: number,
  attributes: {
    title: string,
    description: string,
    price: string,
    banner: boolean,
    slug: string,
    image: ImageInterface | null
  }
}
