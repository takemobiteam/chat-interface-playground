import React from 'react';
import { Card, Table, Tag } from 'antd';

const columns = [
  {
    title: 'Source',
    dataIndex: 'source',
    key: 'source',
  },
  {
    title: 'Status',
    dataIndex: 'include',
    key: 'include',
    render: (_, { include }) => (
      <>
        {include ? (
          <Tag color='blue'>Include</Tag>
        ) : (
          <Tag color='red'>Exclude</Tag>
        )}
      </>
    ),
  },

  {
    title: 'POIs',
    key: 'pois',
    dataIndex: 'pois',
    render: (_, { pois }) => (
      <>
        {pois.map((poi) => {
          return <Tag key={poi}>{poi.toUpperCase()}</Tag>;
        })}
      </>
    ),
  },
];

const data = [
  {
    key: 'user-include',
    source: 'User',
    include: true,
    pois: [],
  },
  {
    key: 'system-include',
    source: 'System',
    include: true,
    pois: [],
  },
  { source: 'User', key: 'user-exclude', include: false, pois: [] },
  {
    source: 'System',
    key: 'system-exclude',
    include: false,
    pois: [],
  },
];

function CardPOIs() {
  return (
    <Card title='Specific POIs' bordered={true}>
      <Table
        columns={columns}
        dataSource={data}
        bordered={false}
        pagination={false}
      />
    </Card>
  );
}

export default CardPOIs;
