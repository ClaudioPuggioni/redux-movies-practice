import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const moviesListCreate = createAsyncThunk("moviesStorage/moviesListCreate", async (pageNum = 1) => {
  const API_URL = "https://api.themoviedb.org/3/discover/movie?api_key=9b153f4e40437e115298166e6c1b997c";
  const response = await fetch(API_URL + "&page=" + pageNum);
  const data = await response.json();
  return [data.results, pageNum];
});

const getDetails = createAsyncThunk("moviesStorage/getDetails", async (movieID) => {
  const DETAILS_URL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=9b153f4e40437e115298166e6c1b997c`;
  const response = await fetch(DETAILS_URL);
  const data = await response.json();
  return data;
});

const moviesSlice = createSlice({
  name: "moviesStorage",
  initialState: {
    watchList: [],
    moviesList: [],
    loading: false,
    error: null,
    currentPage: 1,
    movieDetails: null,
  },
  reducers: {
    addWatchList: (state, action) => {
      if (state.watchList.length === 0) {
        state.watchList.push(action.payload);
      } else if (state.watchList.length > 0 && state.watchList.every((ele) => ele.id !== action.payload.id)) state.watchList.push(action.payload);
    },
    delWatchList: (state, action) => {
      state.watchList = state.watchList.filter((ele) => ele.id !== action.payload.id);
    },
    clearWatchList: (state, action) => {
      state.watchList = [];
    },
  },
  extraReducers: {
    [moviesListCreate.pending]: (state, action) => {
      state.loading = true;
    },
    [moviesListCreate.rejected]: (state, action) => {
      state.loading = false;
      const error = action.error;
      const errorCode = error.code;
      const errorMessage = error.message;
      state.error = error.message;
      console.log(`ERRORCODE:${errorCode}:${errorMessage}`);
    },
    [moviesListCreate.fulfilled]: (state, action) => {
      const [responseList, pageNum] = action.payload;
      state.loading = false;
      state.moviesList = responseList;
      state.currentPage = pageNum;
    },
    [getDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [getDetails.rejected]: (state, action) => {
      state.loading = false;
      const error = action.error;
      const errorCode = error.code;
      const errorMessage = error.message;
      state.error = error.message;
      console.log(`ERRORCODE:${errorCode}:${errorMessage}`);
    },
    [getDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.movieDetails = action.payload;
    },
  },
});

export default moviesSlice.reducer;

export { moviesListCreate, getDetails };

export const { addWatchList, delWatchList, clearWatchList } = moviesSlice.actions;
