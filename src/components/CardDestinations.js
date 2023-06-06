import React from 'react';
import { Card, Table, Tag } from 'antd';

function CardDestinations({ tripProfile }) {
  const selected = tripProfile?.destination?.lat
    ? [tripProfile.destination]
    : [];
  const recommended = tripProfile?.selected_filters
    ? tripProfile?.selected_filters.filter(
        (tag) => tag.category === 'GEOLOCATION'
      )
    : [];

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
            <Tag color='orange'>Recommend</Tag>
          )}
        </>
      ),
    },

    {
      title: 'Destinations',
      key: 'destinations',
      dataIndex: 'destinations',
      render: (_, { destinations }) => (
        <>
          {destinations.map((dest, idx) => {
            return <Tag key={idx}>{dest.name.toUpperCase()}</Tag>;
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
      destinations: selected,
    },
    {
      key: 'system-recommend',
      source: 'System',
      include: false,
      destinations: recommended,
    },
  ];

  return (
    <Card title='Destinations' bordered={true}>
      <Table
        columns={columns}
        dataSource={data}
        bordered={false}
        pagination={false}
      />
    </Card>
  );
}

export default CardDestinations;
