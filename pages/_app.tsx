/* eslint-disable @next/next/no-page-custom-font */
import "../styles/globals.scss";
import "../styles/app-theme.scss";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "next-auth/client";
import React, { useEffect } from "react";
import Head from "next/head";
import client from "../src/gql/client/client";
import { theme } from "../components/theme/theme";
import { ThemeProvider } from "@material-ui/core/styles";
// import { SnackbarProvider } from "notistack";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { AuthContainer } from "../components/auth-container";
import { AContext } from "../components/context/app-context";
import { Toaster } from "react-hot-toast";

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    log();
    initSentry();
  }, []);

  const log = () => {
    console.log("Ahoj, tento portál je zatím ve vývoji.");
    console.log("");
    console.log(
      "Kdybyste náhodou viděli mýho kluka, tak mu řekněte, že ho miluju."
    );
    console.log("PS: Pokud to čteš, Adámku, tak tě miluju <3");
  };

  const initSentry = () => {
    if (process.env.NODE_ENV === "development") return;

    try {
      Sentry.init({
        dsn: process.env.SENTRY_DNS,
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
      });
    } catch (ex) {
      console.log("\n\nSentry down!\n\n");
    }
  };

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/img/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/img/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/img/favicons/safari-pinned-tab.svg"
          color="#121212"
        />
        <link rel="shortcut icon" href="/img/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#121212" />
        <meta
          name="msapplication-config"
          content="/img/favicons/browserconfig.xml"
        />
        <meta name="theme-color" content="#121212" />
        <script type="text/javascript" src="/js/mdb.min.js" defer></script>
      </Head>
      <Provider session={pageProps.session}>
        <AuthContainer>
          <AContext.Provider>
            <Toaster
              position="bottom-left"
              toastOptions={{
                style: {
                  background: "#363636",
                  color: "#fff",
                },
              }}
            />
            <ApolloProvider client={client}>
              <ThemeProvider theme={theme}>
                {/* <SnackbarProvider maxSnack={3}> */}
                <Component {...pageProps} />
                {/* </SnackbarProvider> */}
              </ThemeProvider>
            </ApolloProvider>
          </AContext.Provider>
        </AuthContainer>
      </Provider>
    </div>
  );
};

export default MyApp;
