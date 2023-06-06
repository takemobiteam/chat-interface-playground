import React from 'react';
import { Col, Row, Space } from 'antd';
import CardDestinations from '../components/CardDestinations';

function SuggestedDestinations({ tripProfile }) {
  return (
    <div>
      <Space
        direction='vertical'
        size='middle'
        style={{
          display: 'flex',
        }}
      >
        <Row gutter={24}>
          <Col span={24}>
            <CardDestinations tripProfile={tripProfile} />
          </Col>
        </Row>
      </Space>
    </div>
  );
}

export default SuggestedDestinations;
