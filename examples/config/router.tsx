import React from "react";
import { BrowserRouterProps, createBrowserRouter, RouteObject } from 'react-router-dom';
import { routerPath } from './menu';
import HomeContainer from '../../src/components/Home/index';
import NoMatch from '../../src/components/NotMatch/index';
import PageLayout from "../layout/index";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PageLayout />,
    loader: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(1); }, 300);
      });
    },
    errorElement: (<div>渲染出错</div>),
    children: [
      { index: true, element: <HomeContainer /> },
      { path: '/home', element: <HomeContainer /> },
      { path: "*", element: <NoMatch /> },
    ],
  }
];
