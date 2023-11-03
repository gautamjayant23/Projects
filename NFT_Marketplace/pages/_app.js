import Head from "next/head";
import { NFTProvider } from "../context/NFTcontext";
import "../styles/globals.css";
import { Navbar } from "../components";

const App = ({ Component, pageProps }) => (
  <NFTProvider>
    <div>
      <Head>
        <title>NFT Marketplace</title>
        <meta
          name="description"
          content="This is NFT Marketplace to Mint, buy and Sell NFT"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <div className="pt-65">
        <Component {...pageProps} />
      </div>
    </div>
  </NFTProvider>
);

export default App;
