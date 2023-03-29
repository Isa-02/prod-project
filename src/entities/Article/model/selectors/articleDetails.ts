import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsData = (state:StateSchema) => state.articleDetailds?.data;
export const getArticleDetailsIsLoading = (state:StateSchema) => state.articleDetailds?.isLoading;
export const getArticleDetailsError = (state:StateSchema) => state.articleDetailds?.error;
