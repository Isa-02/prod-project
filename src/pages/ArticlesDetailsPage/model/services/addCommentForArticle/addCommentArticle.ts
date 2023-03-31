import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { User, getUserAuthData, userActions } from 'entities/User';
// import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { Comment } from 'entities/Comment';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import { addCommentFormActions } from 'features/AddCommentForm/model/slices/AddCommentFormSlice';
import { getAddCommentFormText } from 'features/AddCommentForm/model/selectors/AddCommentFormSelectors';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>('articleDetails/addCommentForArticle', async (text, thunkApi) => {
    const {
        extra, dispatch, rejectWithValue, getState,
    } = thunkApi;

    const userData = getUserAuthData(getState());

    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
        return rejectWithValue('no data');
    }

    try {
        const response = await extra.api.post<Comment>('/comments', {
            articleId: article.id,
            userId: userData.id,
            text,
        });

        if (!response.data) {
            throw new Error();
        }
        dispatch(fetchCommentsByArticleId(article.id));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
