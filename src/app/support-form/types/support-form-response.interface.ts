export interface SupportFormResponseInterface {
  data: {
    id: number
    attributes: {
      createdAt: string
      updatedAt: string
      publishedAt: string
      name: string
      email: string
      phone: string
      message: string
    }
  }
  meta: {}
}
