import React, { createContext, Dispatch, FC, SetStateAction, useState } from 'react';


export interface IChatContext {
  isChatEnabled: boolean;
  toggleChatList: Dispatch<SetStateAction<boolean>>;
}

export const ChatContext = createContext<IChatContext>(null!);

export const ChatProvider: FC<any> = ({ children }) => {

  const [isChatEnabled, toggleChatList] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        isChatEnabled,
        toggleChatList,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
