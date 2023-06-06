import React from 'react';
import { Col, Row, Space } from 'antd';

import CardWhenWhere from '../components/CardWhenWhere';
import CardWho from '../components/CardWho';
import CardPreferences from '../components/CardPreferences';
import CardPOIs from '../components/CardPOIs';

function ParsedRequirements({ tripProfile }) {
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
          <Col span={12}>
            <CardWhenWhere tripProfile={tripProfile} />
          </Col>
          <Col span={12}>
            <CardWho tripProfile={tripProfile} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <CardPreferences tripProfile={tripProfile} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <CardPOIs tripProfile={tripProfile} />
          </Col>
        </Row>
      </Space>
    </div>
  );
}

export default ParsedRequirements;
