export const environment = {
  production: true,
  apiUrl: process.env['API_URL_PROD'] || 'Prod url not set',
  apiUrlUpload: process.env['API_URL_UPLOAD_PROD'] || '',
  apiKey: '',
  apiMapKey: '',
  limit: 10,
}
