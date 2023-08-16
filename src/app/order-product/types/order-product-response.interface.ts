export interface OrderProductResponseInterface {
  data: {
    id: 43
    attributes: {
      createdAt: string
      updatedAt: string
      publishedAt: string
      name: string
      setDetails: boolean
      count: number
      client: {
        name: string
        company: string
        email: string
        phone: string
      }
      details: {
        date: string
        workTime: {
          minTime: string
          maxTime: string
        }
        address: string
      }
      note: string
    }
  }
  meta: {}
}
