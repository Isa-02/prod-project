import { lazy } from 'react';

export const ArticlesDetailsPageAsync = lazy(
    () => import('./ArticlesDetailsPage'),
);
