import "../styles/globals.css";
import StoreProvider from "../contexts/store-context";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
  );
}

export default MyApp;
