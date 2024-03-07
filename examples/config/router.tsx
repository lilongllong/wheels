import React from "react";
import { BrowserRouterProps, createBrowserRouter, RouteObject } from 'react-router-dom';
import HomeContainer from '../../src/components/Home/index';
import HouseIndex from '../../src/components/House/index';
import CardIndex from '../../src/components/Car/index';
import NoMatch from '../../src/components/NotMatch/index';
import HaiKouHouse from '../../src/components/House/HaiKou';
import ShenZhenHouse from '../../src/components/House/ShenZhen';
import HouseVisualization from '../../src/dataVisualization/NodeMakeG6/index';
import LottieWeb from '../../src/components/LottieWeb/index';
import WebWorker from '../../src/components/WebWorker/index';
import PageService from '../../src/components/Page/index';
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
      { index: true, element: <HomeContainer name={""} /> },
      { path: '/home', element: <HomeContainer name={""} /> },
      {
        path: '/house',
        // element: <HomeContainer />,
        children: [{
          index: true,
          element: <HouseIndex />,
        }, {
          path: '/house/haikou',
          element: <HaiKouHouse />
        }, {
          path: '/house/shenzhen',
          element: <ShenZhenHouse />
        }, {
          path: '/house/visualization',
          element: <HouseVisualization />
        }]
      },
      {
        path: '/car',
        element: <CardIndex />,
      },
      {
        path: '/lottie',
        element: <LottieWeb />,
      },
      {
        path: '/webworker',
        element: <WebWorker />,
      },
      {
        path: '/page',
        element: <PageService />
      },
      { path: "*", element: <NoMatch /> },
    ],
  }
];
