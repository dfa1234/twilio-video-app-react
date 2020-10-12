import React, { useCallback, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export default function ToggleChatButton(props: { disabled?: boolean; className?: string }) {

  const { isChatEnabled, toggleChatList } = useVideoContext();

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
