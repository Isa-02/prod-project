import { Currency } from 'entities/Currency/model/types/currency';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import cls from './CurrencySelect.module.scss';

interface CurrencySelectProps{
  className?:string,
  value?:Currency,
  onChange?:(value:Currency)=>void,
  readonly?:boolean,
}

export const CurrencySelect = memo(({
    className, value, onChange, readonly,
}:CurrencySelectProps) => {
    const { t } = useTranslation();
    const mods:Mods = {};

    const onChangeHandler = useCallback((value:string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    const options = [{ value: Currency.RUB, content: Currency.RUB },
        { value: Currency.EUR, content: Currency.EUR },
        { value: Currency.USD, content: Currency.USD }];

    return (
        <Select
            readonly={readonly}
            label={t('Укажите валюту')}
            options={options}
            value={value}
            onChange={onChangeHandler}
        />
    );
});
