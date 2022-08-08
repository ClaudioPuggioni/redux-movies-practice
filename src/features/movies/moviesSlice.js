import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = "https://api.themoviedb.org/3/discover/movie?api_key=9b153f4e40437e115298166e6c1b997c";

const moviesListCreate = createAsyncThunk("moviesStorage/moviesListCreate", async (pageNum = 1) => {
  //   pageNum = pageNum < 1 ? 1 : pageNum;
  const response = await fetch(API_URL + "&page=" + pageNum);
  const data = await response.json();
  return [data.results, pageNum];
});

const moviesSlice = createSlice({
  name: "moviesStorage",
  initialState: {
    watchList: [],
    moviesList: [],
    loading: false,
    error: null,
    currentPage: 1,
  },
  reducers: {
    addWatchList: (state, action) => {
      if (state.watchList.length === 0) {
        state.watchList.push(action.payload);
      } else if (state.watchList.length > 0 && state.watchList.every((ele) => ele.id !== action.payload.id)) state.watchList.push(action.payload);
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
  },
});

export default moviesSlice.reducer;

export { moviesListCreate };

export const { addWatchList, clearWatchList } = moviesSlice.actions;
