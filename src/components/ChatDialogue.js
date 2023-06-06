import React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;

function ChatDialogue({ role, content }) {
  return (
    <div className={`chat-dialogue ${role}`}>
      <Text>{content}</Text>
    </div>
  );
}

export default ChatDialogue;
