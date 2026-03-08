// API
// ----------------------------------------------------------------------

export const HOST_API = process.env.REACT_APP_HOST_API_KEY || '';

export const FIREBASE_API = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

export const Appdetails = {
  name: process.env.REACT_APP_NAME,
  email: process.env.REACT_APP_EMAIL,
  logo: process.env.REACT_APP_LOGO,
  address: process.env.REACT_APP_ADDRESS,
  phone: process.env.REACT_APP_PHONE_NUMBER,
  logoHeader: process.env.REACT_APP_LOGO_HEADER,
  footerLogo: process.env.REACT_APP_LOGO_FOOTER,
};
