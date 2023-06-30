/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createTag,
  deleteTag,
  getTags,
  updateTagName,
  updateTagPhoto,
} from "../API/tags";
import { Tag } from "../types/types";

interface TagsSliceValues {
  value: Tag[];
  isLoading: boolean;
  error: string | undefined | null;
}

export const fetchTags = createAsyncThunk(
  "tags/fetchTags",
  async (token: string) => getTags(token)
);

export const fetchCreateNewTag = createAsyncThunk(
  "tags/fetchCreateNewTag",
  async ({ token, data }: { token: string; data: Tag }, { dispatch }) =>
    createTag(token, data).then(() => dispatch(fetchTags(token)))
);

export const fetchDeleteTag = createAsyncThunk(
  "tags/fetchDeleteTag",
  async ({ token, tagId }: { token: string; tagId: number }, { dispatch }) =>
    deleteTag(token, tagId).then(() => dispatch(fetchTags(token)))
);

export const fetchUpdateTagName = createAsyncThunk(
  "tags/fetchUpdateTagName",
  async (
    { token, data, tagId }: { token: string; data: Tag; tagId: number },
    { dispatch }
  ) => updateTagName(token, data, tagId).then(() => dispatch(fetchTags(token)))
);

export const fetchUpdateTagPhoto = createAsyncThunk(
  "tags/fetchUpdateTagPhoto",
  async (
    { token, data, tagId }: { token: string; data: FormData; tagId: number },
    { dispatch }
  ) => updateTagPhoto(token, data, tagId).then(() => dispatch(fetchTags(token)))
);

const TagsSlice = createSlice({
  name: "tags",
  initialState: <TagsSliceValues>{
    value: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    tagsValue: (state, action: PayloadAction<Tag[]>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTags.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchTags.fulfilled,
      (state, action: PayloadAction<Tag[]>) => {
        state.isLoading = false;
        state.value = action.payload;
      }
    );
    builder.addCase(fetchTags.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { tagsValue } = TagsSlice.actions;

export default TagsSlice.reducer;
