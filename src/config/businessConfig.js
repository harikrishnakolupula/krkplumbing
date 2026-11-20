/**
 * Central business configuration for KRK Plumbing.
 *
 * Every component reads contact details and settings from this one file.
 * Leave address, serviceAreas, workingHours and the social links empty until
 * the real details are known: empty values are hidden or replaced with a
 * neutral "will be updated" message, so nothing is ever invented.
 *
 * googleDriveApiKey is a public, browser-side key. Restrict it in Google Cloud
 * to the Google Drive API and to the website's HTTP referrers
 * (https://krkplumbing.site/*). Never put OAuth secrets or service account
 * credentials in this file.
 */
export const businessConfig = {
  businessName: 'KRK Plumbing',
  domain: 'https://krkplumbing.site',

  phone: '8332826347',
  email: 'krkplumbering@gmail.com',
  whatsapp: '918332826347',

  address: '',
  serviceAreas: [],
  workingHours: '',

  googleDriveFolderId: '',
  googleDriveApiKey: '',

  // Optional extras: leave empty to hide them.
  mapsEmbedUrl: '',
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
  },
  greetingRefreshMinutes: 10,
}
