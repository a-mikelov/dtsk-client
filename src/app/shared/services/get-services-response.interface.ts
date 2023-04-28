import {ServiceInterface} from './service.interface'

export interface GetServicesResponseInterface {
  data: ServiceInterface[]
  meta: {
    pages: string
    count: number
  }
}
