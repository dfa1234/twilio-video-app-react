import { styled } from '@material-ui/core/styles';
import React, { FC, useEffect } from 'react';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import usePasscodeAuth, { fetchToken, getPasscode } from '../../state/usePasscodeAuth/usePasscodeAuth';
import Chat from 'twilio-chat';
import { useAppState } from '../../state';


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

  const { room, isChatEnabled } = useVideoContext();
  const { user } = useAppState();

  const passcodeAuth = usePasscodeAuth();

  let chatClient = null;

  useEffect(() => {
    fetchToken(user?.displayName || '', room.name, getPasscode() || '')
      .then(async res => {
        if (res.ok) {
          return res;
        }else{
          throw `Can't get passcode`;
        }
      })
      .then(res => res.json())
      .then(res => {
        return res.token as string;
      })
      .then(
        token => {
          console.log(token);
          return (Chat as any).Client.create(token);
        },
      )
      .then((client: any) => {
        console.log(client);
        chatClient = client;
      })
      .catch(error => console.error(error));


  }, [passcodeAuth]);

  return (<ChatList>
    <p>
      Chat in the room: {room.name}
    </p>
  </ChatList>);
};