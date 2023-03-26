import { Profile } from 'entities/Profile/model/types/profile';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';

import cls from './ProfileCard.module.scss';

interface ProfileCardProps{
  className?:string,
  data?:Profile,
  error?:string,
  isLoading?:boolean;
  readonly?:boolean;
  onChangeLastname?:(value?:string) =>void;
  onChangeFirstname?:(value?:string) =>void;
  onChangeCity?:(value?:string) =>void;
  onChangeAge?:(value?:string) =>void;
  onChangeUsername?:(value?:string) =>void;
  onChangeAvatar?:(value?:string) =>void;
}

export const ProfileCard = (props:ProfileCardProps) => {
    const {
        className, data, error, isLoading,
        readonly, onChangeFirstname, onChangeLastname,
        onChangeAge, onChangeCity,
        onChangeUsername, onChangeAvatar,
    } = props;

    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
                <Loader />
            </div>
        );
    }

    // if (error) {
    //     return (
    //         <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
    //             <Text
    //                 theme={TextTheme.ERROR}
    //                 title={t('Произошла ошибка при загрузке профиля')}
    //                 text={t('Попробуйте обновить страницу')}
    //                 align={TextAlign.CENTER}
    //             />
    //         </div>
    //     );
    // }
    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.data}>
                {data?.avatar && (
                    <div className={cls.avatarWrapper}>

                        <Avatar src={data?.avatar} alt="" />
                    </div>
                ) }
                <div>

                    <Input
                        className={cls.input}
                        value={data?.first}
                        placeholder={t('Ваше имя')}
                        onChange={onChangeFirstname}
                        readonly={readonly}
                    />
                    <Input
                        className={cls.input}
                        value={data?.lastname}
                        placeholder={t('Ваша фамилия')}
                        onChange={onChangeLastname}
                        readonly={readonly}
                    />
                    <Input
                        className={cls.input}
                        value={data?.age}
                        placeholder={t('Ваш возраст')}
                        onChange={onChangeAge}
                        readonly={readonly}
                    />
                    <Input
                        className={cls.input}
                        value={data?.city}
                        placeholder={t('Город ')}
                        onChange={onChangeCity}
                        readonly={readonly}
                    />
                    <Input
                        className={cls.input}
                        value={data?.username}
                        placeholder={t('Введите имя пользователя ')}
                        onChange={onChangeUsername}
                        readonly={readonly}
                    />
                    <Input
                        className={cls.input}
                        value={data?.avatar}
                        placeholder={t('Введите ссылку на аватар ')}
                        onChange={onChangeAvatar}
                        readonly={readonly}
                    />
                </div>
            </div>
        </div>
    );
};
