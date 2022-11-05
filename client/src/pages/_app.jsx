import axios from 'axios';
import '../styles/globals.css';
import {RecoilRoot} from "recoil";
function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  axios.defaults.withCredentials = true;
  return (
    <RecoilRoot>
    <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp
