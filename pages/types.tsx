import { NextComponentType, NextPage, NextPageContext } from "next";
import { ReactElement, ReactNode } from 'react';
import { AppProps } from "next/app";
import { LayoutKeys } from "../layouts/Layouts";

export type MyPage<P = {}, IP = P> = NextPage<P, IP> & {
    Layout?: LayoutKeys;
};

export type MyAppProps = AppProps & {
    Component: NextComponentType<NextPageContext, any, any> & {
        Layout: LayoutKeys;
    };
};


// export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
//     getLayout?: (page: ReactElement) => ReactNode
// }

// export type AppPropsWithLayout = AppProps & {
//     Component: NextPageWithLayout
// }

export type NextPageWithLayout<T = {}> = NextPage<T> & {
    getLayout: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout<T = {}> = AppProps & {
    Component: NextPageWithLayout<T>;
};

