import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import useChatContext from '../../../hooks/useChatContext/useChatContext';

export default function ToggleChatButton(props: { disabled?: boolean; className?: string }) {

  const { isChatEnabled, toggleChatList } = useChatContext();

  const toggleChat = useCallback(() => {
    toggleChatList(!isChatEnabled);
  }, [isChatEnabled]);

  return (
    <Button
      className={props.className}
      onClick={toggleChat}
    >
      {isChatEnabled ? 'Close Chat' : 'Open Chat'}
    </Button>
  );
}
