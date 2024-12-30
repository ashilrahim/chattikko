import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { MdOutlineDeleteOutline } from "react-icons/md";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    deleteMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
    notifications,
    clearNotifications,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  const handleNotificationClick = (senderId) => {
    // Clear notifications for this sender and fetch their messages
    clearNotifications(senderId);
    getMessages(senderId); // Load the sender's chat
  };

  const handleDeleteMessage = (messageId) => {
    deleteMessage(messageId);
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-gray-200 p-4 shadow-md">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="p-2 bg-white mb-2 rounded-md cursor-pointer hover:bg-gray-100"
              onClick={() => handleNotificationClick(notification.senderId)}
            >
              <p className="text-sm font-medium">{notification.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              } relative group transition-transform duration-300 ease-out`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col relative">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
                {message.senderId === authUser._id && (
                  <button
                    aria-label="Delete message"
                    onClick={() => handleDeleteMessage(message._id)}
                    className="absolute -right-2 top-0 hidden group-hover:block hover:bg-red-600 bg-red-500 text-white p-1 rounded-full transition-colors"
                  >
                    <MdOutlineDeleteOutline size={16} />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg italic">
              start messages to display 😌
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
