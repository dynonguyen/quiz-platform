import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import chatApi from '~/apis/chatApi';
import { SOCKET_EVENTS } from '~/constant/socket';
import { socket } from '~/socket';

// -----------------------------
export const savePresentation = createAsyncThunk(
  'chat/updateChatSeen',
  async (updateFields, thunkAPI) => {
    const chatBox = thunkAPI.getState().chatBox;
    const { presentationId } = chatBox;
    if (presentationId) return;
    try {
      const apiRes = await chatApi.putUpdateSeen(updateFields);
      if (apiRes.status === 200) {
        thunkAPI.dispatch(updateChatBox(updateFields));
        socket.emit(SOCKET_EVENTS.UPDATE_CHAT, updateFields);
      }
    } catch (error) {
      toast.error('Cập nhật chatbox đã xảy ra lỗi, thử lại');
    }
  }
);

// -----------------------------
const initialState = {
  chats: [],
  thisUserId: ''
};

// -----------------------------
const chatBoxSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateChatBox(state, action) {
      return { ...state, ...action.payload };
    },
    addChat(_, action) {
      return { ...initialState, loading: false, ...action.payload };
    }
  }
});

const { reducer, actions } = chatBoxSlice;
export const { updateChatBox, addChat } = actions;
export default reducer;
