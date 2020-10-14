import { useEffect, useState } from 'react';
import useVideoContext from '../useVideoContext/useVideoContext';
import { useAppState } from '../../state';
import Chat from 'twilio-chat';
import { Channel } from 'twilio-chat/lib/channel';

const MESSAGES_HISTORY_LIMIT = 50;

interface IChatMessage {
  username: string,
  date: Date,
  body: string
}

export const useChatMessages = () => {

  const { room } = useVideoContext();
  const { token } = useAppState();

  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [channel, setChannel] = useState<Channel | null>(null);

  let chatClient = null;
  let currentChannel: Channel | null = null;

  useEffect(() => {
    (async function anyNameFunction() {

      chatClient = await Chat.create(token);

      currentChannel = await chatClient.createChannel({
        friendlyName: room.name,
        uniqueName: room.name,
      }).catch(e => console.error(e?.message)) as Channel | null;

      // If we don't have the channel at this point, we assume it was already created for this unique room name
      // so we try to connect to the existing channel instead
      currentChannel = await chatClient.getChannelByUniqueName(room.name).catch(e => console.error(e?.message)) as Channel | null;

      if (!currentChannel) {
        console.error('Impossible to create or connect to channel ', room.name);
        return;
      }

      if (currentChannel.status !== 'joined') {
        await currentChannel.join().catch(e => console.error(e?.message));
      }

      setChannel(currentChannel);

      const historyMessages = await currentChannel.getMessages(MESSAGES_HISTORY_LIMIT);

      setMessages(historyMessages.items.map(message => {
        return {
          username: message.author,
          date: message.dateCreated,
          body: message.body,
        };
      }));


      if (currentChannel) {

        (currentChannel as Channel).on('messageAdded', message => {
          setMessages((messagesChat) => ([...messagesChat, {
            username: message.author,
            date: message.dateCreated,
            body: message.body,
          }]));
        });


        //TODO system messages (connection, deconnection, is typing etc...):
        (currentChannel as Channel).on('typingStarted', (message: any) => {
          console.log(message);
        });
        (currentChannel as Channel).on('typingEnded', (message: any) => {
          console.log(message);
        });
        (currentChannel as Channel).on('memberJoined', (message: any) => {
          console.log(message);
        });
        (currentChannel as Channel).on('memberLeft', (message: any) => {
          console.log(message);
        });

      }


    })();
  }, [token]);


  return { messages, channel };
};
