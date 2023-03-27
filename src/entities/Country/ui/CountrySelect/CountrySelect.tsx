import { Country } from 'entities/Country/model/types/country';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Mods } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import cls from './CurrencySelect.module.scss';

interface CountrySelectProps{
  className?:string,
  value?:Country,
  onChange?:(value:Country)=>void,
  readonly?:boolean,
}

export const CountrySelect = memo(({
    className, value, onChange, readonly,
}:CountrySelectProps) => {
    const { t } = useTranslation();
    const mods:Mods = {};

    const onChangeHandler = useCallback((value:string) => {
        onChange?.(value as Country);
    }, [onChange]);

    const options = [{ value: Country.Russia, content: Country.Russia },

        { value: Country.Armenia, content: Country.Armenia },
        { value: Country.Belarus, content: Country.Belarus },
        { value: Country.Kazakhstan, content: Country.Kazakhstan },
    ];

    return (
        <Select
            readonly={readonly}
            label={t('Укажите страну')}
            options={options}
            value={value}
            onChange={onChangeHandler}
        />
    );
});
