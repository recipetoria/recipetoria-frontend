/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import getUserProfilePhoto from "../API/getUserProfilePhoto";
import { IResponse } from "../types/types";
import updateUserProfilePhoto from "../API/updateUserProfilePhoto";

interface IUserPhotoResponse extends IResponse {
  data: {
    profilePhoto: string;
  };
}

export interface IFetchUpdateUserPhotoProps {
  data: FormData;
  token: string;
}

export const fetchUserPhoto = createAsyncThunk(
  "user/fetchUserPhoto",
  async (token: string) => getUserProfilePhoto(token)
);

export const fetchUpdateUserPhoto = createAsyncThunk(
  "photo/fetchUpdateUserPhoto",
  async ({ data, token }: IFetchUpdateUserPhotoProps, { dispatch }) =>
    updateUserProfilePhoto(data, token).then(() =>
      dispatch(fetchUserPhoto(token))
    )
);

const UserPhotoSlice = createSlice({
  name: "userPhoto",
  initialState: {
    value: "",
    error: <string | undefined | null>null,
  },
  reducers: {
    userPhotoValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUserPhoto.fulfilled,
      (state, action: PayloadAction<IUserPhotoResponse>) => {
        state.value = action.payload.data.profilePhoto;
      }
    );
    builder.addCase(fetchUserPhoto.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { userPhotoValue } = UserPhotoSlice.actions;

export default UserPhotoSlice.reducer;
