import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const onGetSeries = async (_, thunkAPI) => {
  try {
    const apiKey = '35b2affc';
    const categories = ['drama', 'thriller', 'fantasy'];
    let allSeries = [];

    for (const category of categories) {
      const url = `https://www.omdbapi.com/?s=${category}&type=series&apikey=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.Search) {
        allSeries.push(...data.Search);
      }
    }

    allSeries.sort(() => Math.random() - 0.5);

    const seriesWithDetails = await Promise.all(
      allSeries.slice(0, 20).map(async (series) => {
        const seriesDetailsUrl = `https://www.omdbapi.com/?i=${series.imdbID}&apikey=${apiKey}`;
        const seriesDetailsResponse = await fetch(seriesDetailsUrl);
        const seriesDetails = await seriesDetailsResponse.json();

        return {
          ...series,
          genre: seriesDetails.Genre || 'N/A',
          year: seriesDetails.Year || 'N/A',
          runtime: seriesDetails.Runtime || 'N/A',
          country: seriesDetails.Country || 'N/A',
          rating: seriesDetails.imdbRating || 'N/A',
          actors: seriesDetails.Actors || 'N/A',
          director: seriesDetails.Director || 'N/A',
          writer: seriesDetails.Writer || 'N/A',
          plot: seriesDetails.Plot || 'N/A',
        };
      })
    );

    return thunkAPI.fulfillWithValue(seriesWithDetails);
  } catch (error) {
    console.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
};

const getSeries = createAsyncThunk(
  'series/getSeries',
  onGetSeries,
);

const initialState = {
  isLoadingSeries: false,
  series: null,
  errorMessageSeries: '',
};

const seriesSlice = createSlice({
  name: 'series',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSeries.pending, state => {
        state.isLoadingSeries = true;
        state.series = null;
        state.errorMessageSeries = '';
      })
      .addCase(getSeries.fulfilled, (state, { payload }) => {
        state.isLoadingSeries = false;
        state.series = payload;
        state.errorMessageSeries = '';
      })
      .addCase(getSeries.rejected, (state, { payload }) => {
        state.isLoadingSeries = false;
        state.series = null;
        state.errorMessageSeries = payload;
      });
  }
});

export { getSeries };
export const { reducer: seriesReducer } = seriesSlice;
