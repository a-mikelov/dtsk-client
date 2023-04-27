export interface ImageInterface {
  data: {
    attributes: {
      alternativeText: string | null
      caption: string | null
      createdAt: string
      ext: string
      formats: {
        [key: string]: {
          ext: string
          hash: string
          height: 720
          mime: string
          name: string
          path: null
          size: number
          url: string
          width: 1000
        }
      }
      hash: string
      height: number
      mime: string
      name: string
      previewUrl: string | null
      provider: string
      provider_metadata: null
      size: number
      updatedAt: string
      url: string
      width: number
    },
    id: number
  }
}
