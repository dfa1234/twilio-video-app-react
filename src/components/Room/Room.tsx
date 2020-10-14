import React from 'react';
import ParticipantList from '../ParticipantList/ParticipantList';
import { styled } from '@material-ui/core/styles';
import MainParticipant from '../MainParticipant/MainParticipant';
import { ChatContent } from '../ChatContent/ChatContent';
import useChatContext from '../../hooks/useChatContext/useChatContext';

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: `1fr ${theme.sidebarWidth}px`,
  gridTemplateRows: '100%',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: `100%`,
    gridTemplateRows: `1fr ${theme.sidebarMobileHeight + 16}px`,
  },
}));


export default function Room() {

  const { isChatEnabled } = useChatContext();

  return (
    <Container>
      <MainParticipant />
      <ParticipantList />
      {isChatEnabled && <ChatContent />}
    </Container>
  );
}
