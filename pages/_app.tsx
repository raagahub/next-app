import { useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { Noto_Sans, Spectral } from 'next/font/google'
import { MyAppProps, AppPropsWithLayout } from '../layouts/types'
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider, Tuple, DefaultMantineColor } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NavBar } from '../library/components/NavBar/NavBar';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

type ExtendedCustomColors = 'raga-red' | 'raga-orange' | 'raga-green' | DefaultMantineColor; // | 'secondaryColorName'

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

const customThemeColors: Partial<Record<ExtendedCustomColors, Tuple<string, 10>>> = {
  'raga-red': [
    "#fbefee",
    "#f0dcda",
    "#e4b4b1",
    "#da8a85",
    "#d36660",
    "#cd5148",
    "#cb453b",
    "#b4372e",
    "#a12f28",
    "#8d2520"
  ],
  'raga-orange': [
    "#fff0e7",
    "#fcdfd2",
    "#f5bea5",
    "#ef9a74",
    "#ea7c4b",
    "#e86930",
    "#e65f22",
    "#cd4e16",
    "#b74510",
    "#a13908"
  ],
  'raga-green': [
    "#f5f8ec",
    "#eaece1",
    "#d2d7c4",
    "#b9c1a4",
    "#a4ae89",
    "#97a277",
    "#909c6d",
    "#7c875c",
    "#6e784f",
    "#5e683f"
  ]
}

const spectralFont = Spectral({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})
const customHeadingFont = { fontFamily: spectralFont.style.fontFamily }

const notoSansFont = Noto_Sans({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})
const customBodyFont = notoSansFont.style.fontFamily

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
            primaryColor: 'raga-orange',
            primaryShade: 8,
            headings: customHeadingFont,
            fontFamily: customBodyFont,
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
