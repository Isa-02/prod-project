import { lazy } from 'react';

export const ArticlesDetailsPageAsync = lazy(
    () => new Promise((resolve) => {
        // @ts-ignore
        // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
        setTimeout(() => resolve(import('./ArticlesDetailsPage')), 400);
    }),
);
