import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useStore } from 'react-redux';

export type ReducerList = {
  [name in StateSchemaKey]?:Reducer
}

type ReducerListEntry=[StateSchemaKey, Reducer]

interface DynamicModuleLoaderProps{
  reducers:ReducerList;
  removeAfterUnmount?:boolean;
}

export const DynamicModuleLoader:FC<DynamicModuleLoaderProps> = (props) => {
    const {
        children, reducers, removeAfterUnmount,
    } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManager;

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager.add(name as StateSchemaKey, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.add(name as StateSchemaKey, reducer);
                    dispatch({ type: `@INIT ${name} reducer` });
                });
            }
        };
    }, []);

    return (

        <div>
            {children}
        </div>
    );
};
