import { useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { MyAppProps, AppPropsWithLayout } from '../layouts/types'
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider, Tuple, DefaultMantineColor } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NavBar } from '../library/components/NavBar/NavBar';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

type ExtendedCustomColors = 'raga-red' | DefaultMantineColor; // | 'secondaryColorName'

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

const customThemeColors: Partial<Record<ExtendedCustomColors, Tuple<string, 10>>> = {
  'raga-red': [
    "#9E615D",
    "#97514D",
    "#92423E",
    "#8E342F",
    "#8C2520",
    "#8C1710",
    "#8D0801",
    "#72130D",
    "#5E1915",
    "#4E1C1A"
  ]
}

export default function App(props: AppPropsWithLayout<{
  initialSession: Session
}> & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page)
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <>
      <Head>
        <title>Raagahub</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ 
            colorScheme, 
            colors: customThemeColors,
            primaryColor: 'orange',
            primaryShade: 8
            }} withGlobalStyles withNormalizeCSS>
            <NavBar />
            <Notifications position="top-right" mt={48} zIndex={199} />
            {getLayout(<Component {...pageProps} />)}
          </MantineProvider>
        </ColorSchemeProvider>
      </SessionContextProvider>

    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};
