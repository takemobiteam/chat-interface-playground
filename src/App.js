import { useState } from 'react';

import 'antd/dist/reset.css';
import './App.css';

import { Row, Col } from 'antd';
import Nav from './components/Nav';
import Main from './layout/Main';
import Chat from './components/Chat';

import { BASE_URL } from './utils/ChatUtils';

function App() {
  const [sessionID, setSessionID] = useState('');

  const [chatLog, setChatLog] = useState([]);
  const [rawRes, setRawRes] = useState([]);

  // Chat state
  const [chatSuccess, setChatSuccess] = useState(true);
  const [loading, setLoading] = useState(false);

  // Trip profile
  const [tripProfile, setTripProfile] = useState();

  async function sendChatMsg(userInput) {
    setChatLog([...chatLog, { role: 'user', content: userInput }]);

    try {
      setLoading(true);

      const res = await fetch(BASE_URL + sessionID, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ input: userInput }),
      });

      const data = await res.json();
      console.log('data', data);

      // Set sessionID to identify following requests
      if (sessionID.length === 0) {
        setSessionID(data.session_id);
      }

      // Update chat status and log
      setChatSuccess(data.success);
      setChatLog(data.history);
      setRawRes(data.raw_data);

      // Update trip profile
      setTripProfile(data);

      // Update state
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    return null;
  }

  return (
    <div className='App'>
      <Row gutter={24}>
        <Col span={4}>
          <Nav />
        </Col>
        <Col span={13}>
          <Main tripProfile={tripProfile} />
        </Col>
        <Col span={7}>
          <Chat
            chatLog={chatLog}
            onSendChatMsg={sendChatMsg}
            loading={loading}
            rawRes={rawRes}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
