import { styled } from '@material-ui/core/styles';
import React, { FC, useEffect } from 'react';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import usePasscodeAuth, { fetchToken, getPasscode } from '../../state/usePasscodeAuth/usePasscodeAuth';
import Chat from 'twilio-chat';
import { useAppState } from '../../state';
import useChatContext from '../../hooks/useChatContext/useChatContext';


const ChatList = styled('div')(({ theme }) => ({
  position: 'absolute',
  paddingTop: 30,
  top: 0,
  left: 0,
  bottom: 50,
  backgroundColor: 'white',
  width: 250,
  height: '100%',
}));


export const ChatContent: FC<any> = () => {

  const { room } = useVideoContext();
  const { isChatEnabled } = useChatContext();
  const { user, token } = useAppState();

  let chatClient = null;

  useEffect(() => {
    (async function anyNameFunction() {
      chatClient = await Chat.create(token);
      console.log(chatClient);
    })();
  }, [token]);

  return (<ChatList>
    <p>
      Chat in the room: {room.name}
    </p>
  </ChatList>);
};