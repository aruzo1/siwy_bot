import { AppProps } from "next/app";
import "@/styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="font-sans">
      <Component {...pageProps} />
    </div>
  );
};

export default App;
