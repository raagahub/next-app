import { useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { Noto_Sans, Spectral } from 'next/font/google'
import { MyAppProps, AppPropsWithLayout } from '../layouts/types'
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider, Tuple, DefaultMantineColor } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import ModalProvider from '../library/providers/ModalProvider'
import UserProvider from '../library/providers/UserProvider';

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
    "#f5f8ee",
    "#ebede2",
    "#d5d8c4",
    "#bdc3a5",
    "#aab089",
    "#9ea577",
    "#979f6d",
    "#828b5a",
    "#747b4e",
    "#636a3e"
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
        <title>Ragahub</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ColorSchemeProvider colorScheme={colorScheme == 'light' ? 'light' : 'light'} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{
            colorScheme: 'light',
            colors: customThemeColors,
            primaryColor: 'raga-red',
            primaryShade: 6,
            headings: customHeadingFont,
            fontFamily: customBodyFont,
          }} withGlobalStyles withNormalizeCSS>
            <UserProvider>
              <ModalProvider />
              <Notifications position="top-right" mt={48} zIndex={199} />
              {getLayout(<Component {...pageProps} />)}
            </UserProvider>
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
