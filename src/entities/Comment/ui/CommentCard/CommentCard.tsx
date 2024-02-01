import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text } from 'shared/ui/Text/Text';

import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { VStack } from 'shared/ui/Stack/VStack/VStack';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { t } = useTranslation();
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <div
                className={classNames(cls.CommentCard, {}, [className, cls.loading])}
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton height={16} width={100} className={cls.username} />
                </div>
                <Skeleton width="100%" height={50} className={cls.text} />
            </div>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <VStack gap='8' max className={classNames(cls.CommentCard, {}, [className])}>
            <AppLink
                to={`${RoutePath.profile}${comment.user.id}`}
                className={cls.header}
            >
                {comment.user.avatar ? (
                    <Avatar size={30} src={comment.user.avatar} />
                ) : null}
                <Text className={cls.username} title={comment.user.username} />
            </AppLink>
            <Text className={cls.text} text={comment.text} />
        </VStack>
    );
});
