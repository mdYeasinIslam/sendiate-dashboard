import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UnReadCount {
  count: number;
}

interface ChatUnReadCount {
  stats: UnReadCount | 0;
}

const initialState: ChatUnReadCount = {
  stats: 0,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<UnReadCount>) => {
      state.stats = action.payload;
    },
  },
});

export const { setCount } = chatSlice.actions;
export default chatSlice;
