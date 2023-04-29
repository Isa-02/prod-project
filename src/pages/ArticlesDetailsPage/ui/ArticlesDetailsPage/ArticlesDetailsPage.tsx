import { ArticleDetails, ArticleList } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { getArticleCommentsIsLoading } from 'pages/ArticlesDetailsPage/model/selectors/comments';
import { fetchCommentsByArticleId } from 'pages/ArticlesDetailsPage/model/services/fetchCommentsByArticleId';
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from 'pages/ArticlesDetailsPage/model/slices/articleDetailsCommentsSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { AddCommentForm } from 'features/AddCommentForm';
import { addCommentForArticle } from 'pages/ArticlesDetailsPage/model/services/addCommentForArticle/addCommentArticle';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page/Page';

import { getArticleRecommendationsIsLoading } from 'pages/ArticlesDetailsPage/model/selectors/recommendations';
import {
    articleDetailsPageRecommendationsReducer,
    getArticleRecommendations,
} from 'pages/ArticlesDetailsPage/model/slices/articleDetailsPageRecommendationsSlice';
import { fetchArticleRecommendations } from 'pages/ArticlesDetailsPage/model/services/fetchArticleRecommendstions/fetchArticleRecommendstions';
import { articleDetailsPageReducer } from 'pages/ArticlesDetailsPage/model/slices';
import cls from './ArticlesDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticlesDetailsPageProps {
  className?: string;
}

const reducers: ReducerList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticlesDetailsPage = ({ className }: ArticlesDetailsPageProps) => {
    const { t } = useTranslation('article-details');

    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const recommendations = useSelector(getArticleRecommendations.selectAll);

    const recommendationsIsLoading = useSelector(
        getArticleRecommendationsIsLoading,
    );
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );



    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    });

    if (!id) {
        return (
            <Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
                {t('Статья не найдена.')}
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <Text
                    size={TextSize.L}
                    className={cls.commentTitle}
                    title={t('Рекомендуем')}
                />
                <ArticleList
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    className={cls.recommendations}
                    target="_blank"
                />
                <Text
                    size={TextSize.L}
                    className={cls.commentTitle}
                    title={t('Комментарии')}
                />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList isLoading={commentsIsLoading} comments={comments} />
            </Page>
        </DynamicModuleLoader>
    );
};
export default memo(ArticlesDetailsPage);
