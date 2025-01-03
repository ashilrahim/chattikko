import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    console.log("Fetching messages for userId:", userId);
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`messages/${userId}`);
      console.log("Messages fetched:", res.data);
      set({ messages: res.data });
    } catch (error) {
      console.error(
        "Error fetching messages:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      console.log("Setting isMessagesLoading to false");
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      console.log("API Response:", res);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  deleteMessage: async (messageId) => {
    const { messages } = get();
    try {
      const res = await axiosInstance.delete(`/messages/delete/${messageId}`);
      toast.success(res.data.message);
      // Update the local messages array by filtering out the deleted message
      set({
        messages: messages.filter((message) => message._id !== messageId),
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  //todo: optimize this one later
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
