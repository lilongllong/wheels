import React, { FC } from 'react';

import { Routes, Route, RouteProps, redirect, createBrowserRouter } from 'react-router-dom';

import { routes } from '../config/router';

export const router = createBrowserRouter(routes);
