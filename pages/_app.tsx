import React from "react";
import Router from "next/router";
import { ThemeProvider } from "styled-components";
import NProgress from "nprogress";
import { ThirdwebProvider } from "@3rdweb/react";
import { GlobalMeta } from "utils/meta";
import GlobalStyles from "utils/globalStyles";
import { theme } from "utils/theme";
import "normalize.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// const canUseDOM = typeof window !== "undefined";
// const useIsomorphicLayoutEffect = canUseDOM
//   ? React.useLayoutEffect
//   : React.useEffect;

function App({ Component, pageProps }) {
  // const [mounted, setMounted] = React.useState(false);

  // useIsomorphicLayoutEffect(() => {
  //   setMounted(true);
  // }, []);
  const supportedChainIds = [1, 137];

  const connectors = {
    injected: {},
    walletconnect: {},
    walletlink: {
      appName: "pixeltrue",
      url: "https://pixeltrue.com",
      darkMode: false,
    },
  };

  return (
    // <ThemeProvider theme={theme} key={String(mounted)}>
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <ThemeProvider theme={theme}>
        <GlobalMeta />
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </ThirdwebProvider>
  );
}

export default App;
