import axios from 'axios';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  axios.defaults.withCredentials = true;
  return <Component {...pageProps} />
}

export default MyApp
