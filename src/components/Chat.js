import { useState } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { Card, Input, Space, Button, Tooltip, Skeleton, Collapse } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { parseRawRes, formatRawRes } from '../utils/ChatUtils';
import ChatDialogue from './ChatDialogue';

const { TextArea } = Input;
const { Panel } = Collapse;

function Chat({ rawRes, chatLog, onSendChatMsg, loading }) {
  // LLM data
  const filteredLLMRes = parseRawRes(rawRes);

  // Chat input
  const [inputContent, setInputContent] = useState('');
  const handleInput = (e) => {
    setInputContent(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      setInputContent('');
    }
  };

  async function handleSubmit() {
    await onSendChatMsg(inputContent);
  }

  // Chat export
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(chatLog)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'chatLog.json';

    link.click();
  };

  return (
    <div className='chat-container'>
      <Card
        title='Chat'
        extra={
          <Tooltip title='Save chat history into a JSON'>
            <Button onClick={exportData} icon={<DownloadOutlined />}>
              Export
            </Button>
          </Tooltip>
        }
        className='chat'
      >
        <div className='chat-height-control'>
          <ScrollableFeed>
            {chatLog.map((chatLog, idx) => {
              return (
                <ChatDialogue
                  key={idx}
                  role={chatLog.role}
                  content={chatLog.content}
                />
              );
            })}

            {!loading && (
              <Collapse ghost accordion>
                {filteredLLMRes.map((res, idx) => (
                  <Panel header={res.name} key={idx}>
                    {formatRawRes(res.value)}
                  </Panel>
                ))}
              </Collapse>
            )}

            {loading && (
              <div className='chat-dialogue assistant'>
                <Skeleton
                  active
                  title={false}
                  paragraph={{
                    rows: 2,
                  }}
                />
              </div>
            )}
          </ScrollableFeed>
        </div>

        <footer className='chat-footer'>
          <Space.Compact
            style={{
              width: '100%',
            }}
          >
            <TextArea
              className='chat-input'
              placeholder='Say something about your trip'
              autoSize={{
                minRows: 1,
                maxRows: 6,
              }}
              value={inputContent}
              onInput={handleInput}
              onPressEnter={handleSubmit}
              onKeyUp={handleKeyUp}
            />
          </Space.Compact>
        </footer>
      </Card>
    </div>
  );
}

export default Chat;
