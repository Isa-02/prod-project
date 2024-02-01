import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from 'features/AddCommentForm/model/selectors/AddCommentFormSelectors';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from 'features/AddCommentForm/model/slices/AddCommentFormSlice';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { HStack } from 'shared/ui/Stack/HStack/HStack';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const redusers: ReducerList = {
    AddCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation();

    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);
    const dispatch = useAppDispatch();
    const onCommentTextChange = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value));
        },
        [dispatch],
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={redusers}>
            <HStack
                justify="between"
                max
                className={classNames(cls.AddCommentForm, {}, [className])}
            >
                <Input
                    className={cls.input}
                    placeholder={t('Введите текст комментария')}
                    value={text}
                    onChange={onCommentTextChange}
                />
                <Button theme={ButtonTheme.OUTLINE} onClick={onSendHandler}>
                    {t('Отправить')}
                </Button>
            </HStack>
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
