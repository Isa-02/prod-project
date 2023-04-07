import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { SortOrder } from "shared/types";
import { ArticleSortField, ArticleType } from "entities/Article";
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlePageSlices";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>("articlesPage/initArticlesPage", async (searchParams, thunkApi) => {
  const { extra, rejectWithValue, getState, dispatch } = thunkApi;
  const inited = getArticlesPageInited(getState());
  if (!inited) {
    const orderFromUrl = searchParams.get("order") as SortOrder;
    const sortFromUrl = searchParams.get("sort") as ArticleSortField;
    const searchFromUrl = searchParams.get("search");
    const searchFromType = searchParams.get("type") as ArticleType;
    if (orderFromUrl) {
      dispatch(articlesPageActions.setOrder(orderFromUrl));
    }
    if (sortFromUrl) {
      dispatch(articlesPageActions.setSort(sortFromUrl));
    }
    if (searchFromUrl) {
      dispatch(articlesPageActions.setSearch(searchFromUrl));
    }
    if (searchFromType) {
      dispatch(articlesPageActions.setType(searchFromType));
    }
    dispatch(articlesPageActions.initState());
    dispatch(fetchArticlesList({}));
  }
});
