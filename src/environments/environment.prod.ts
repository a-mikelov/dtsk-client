export const environment = {
  production: true,
  apiUrl: process.env['ADMIN_URL_PROD'] + '/api' || 'Prod url not set',
  uploadUrl: process.env['ADMIN_URL_PROD'] || '',
  apiKey: '',
  apiMapKey: '',
  limit: 10,
}
