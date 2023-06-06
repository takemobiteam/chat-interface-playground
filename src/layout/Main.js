import React from 'react';

import { Typography, Space } from 'antd';
import ViewControl from './ViewControl';

const { Text, Title } = Typography;

function Main({
  tripProfile,
  startTime,
  endTime,
  origin,
  destination,
  travelers,
  includeTags,
  excludeTags,
}) {
  return (
    <div className='main'>
      <Space
        direction='vertical'
        size='middle'
        style={{
          display: 'flex',
        }}
      >
        <header className='header'>
          <Title level={2}>New Test</Title>
          <Text type='secondary'>
            A short description of why you are testing
          </Text>
        </header>
        <ViewControl
          tripProfile={tripProfile}
          // startTime={startTime}
          // endTime={endTime}
          // origin={origin}
          // destination={destination}
          // travelers={travelers}
          // includeTags={includeTags}
          // excludeTags={excludeTags}
        />
      </Space>
    </div>
  );
}

export default Main;
