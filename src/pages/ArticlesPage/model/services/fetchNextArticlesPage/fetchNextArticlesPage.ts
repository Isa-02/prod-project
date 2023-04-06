import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import {
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageNum,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlePageSlices';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('articlesPage/fetchNextArticlesPage', async (_, thunkApi) => {
    const {
        extra, rejectWithValue, getState, dispatch,
    } = thunkApi;
    const isLoading = getArticlesPageIsLoading(getState());

    const page = getArticlesPageNum(getState());

    const hasMore = getArticlesPageHasMore(getState());

    if (hasMore && !isLoading) {
        dispatch(articlesPageActions.setPage(page + 1));
        dispatch(
            fetchArticlesList({
                page: page + 1,
            }),
        );
    }
});
