import { styled } from '@material-ui/core/styles';
import React, { FC, RefObject, useCallback, useRef, useState } from 'react';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { Box } from '@material-ui/core';
import { formatDate } from '../../utils/dateFormat';
import { useChatMessages } from '../../hooks/useChatMessages/useChatMessages';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Channel } from 'twilio-chat/lib/channel';


//to scroll to the last message
const scrollToBottom = (ref: any) => {
  setTimeout(() => {
    if (ref && ref.current) {
      // @ts-ignore
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  });
};

export const ChatContent: FC<any> = () => {

  const {
    room: { localParticipant, name: roomName },
  } = useVideoContext();
  const { messages, channel } = useChatMessages();
  const [currentMessage, setCurrentMessage] = useState<string>('');

  let chatWindow = useRef();
  let textInput = useRef();

  scrollToBottom(chatWindow);


  const sendMyMessage = useCallback(() => {
    (channel as any as Channel).sendMessage(currentMessage).then(messageIndex => {
      if (textInput && textInput.current) {
        // @ts-ignore
        textInput.current.value = '';
      }
      scrollToBottom(chatWindow);
    });
  }, [channel, textInput, currentMessage]);


  return (<MainWrapper>
    <ChatWindow ref={chatWindow as any as RefObject<HTMLDivElement>}>
      <Title>
        Chat in the room: {roomName}
      </Title>
      {messages.map(message =>
        (<Bubble key={message.date.toTimeString()}
                 alignSelf={localParticipant?.identity === message.username ? 'flex-end' : 'flex-start'}
                 bgcolor={localParticipant?.identity === message.username ? '#d7ffd7' : '#dfe9e7'}
        >
          {message.body}
          <Author>
            {message.username} - {formatDate(message.date)}
          </Author>
        </Bubble>))}
    </ChatWindow>
    <ControlBar>
      <FullWidthField id="outlined-basic" label="Your message" variant="outlined"
                      inputRef={textInput}
                      onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                          ev.preventDefault();
                          sendMyMessage();
                        }
                      }}
                      onChange={(event) => setCurrentMessage(event?.target?.value)} />
      <SubmitButton
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        style={{ marginLeft: 5 }}
        onClick={() => {
          sendMyMessage();
        }}>
        Enter
      </SubmitButton>
    </ControlBar>
  </MainWrapper>);
};


const Bubble = styled(Box)({
  width: 300,
  borderRadius: 5,
  padding: 10,
  margin: 10,
  border: '1px solid lightgray',
});

const Title = styled('p')({
  color: 'gray',
  fontFamily: 'sans-serif',
  margin: 0,
  fontSize: 18,
  minWidth: 160,
  textAlign: 'center',
  marginTop: 20,
  marginBottom: 20,
});

const Author = styled(Box)({
  display: 'block',
  fontFamily: 'monospace',
  fontStyle: 'italic',
  fontSize: 12,
  marginTop: 3,
  textAlign: 'right',
});

const ChatWindow = styled('div')({
  overflowY: 'scroll',
  width: '100%',
  height: '90%',
});

const FullWidthField = styled(TextField)({
  flex: 1,
});

const ControlBar = styled(Box)({
  display: 'flex',
  marginTop: 20,
  marginLeft: 5,
});

const SubmitButton = styled(Button)({
  width: 100,
});

const MainWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
  width: 350,
  backgroundColor: 'whitesmoke',
  border: '1px solid lightgray',
  position: 'absolute',
  paddingTop: 30,
  top: 0,
  left: 0,
  bottom: 50,
  height: '100%',
  zIndex: 2,
});
