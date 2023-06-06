import { Card, Table, Tag, Typography } from 'antd';
import { excludeTags, STATUS_MAP } from '../utils/ChatUtils';

const { Text } = Typography;

function CardPreferences({ tripProfile }) {
  const included = tripProfile?.selected_filters
    ? excludeTags(tripProfile?.selected_filters)
    : [];
  const excluded = tripProfile?.excluded_filters
    ? excludeTags(tripProfile?.excluded_filters)
    : [];
  const recommended = tripProfile?.recommended_filters
    ? excludeTags(tripProfile?.recommended_filters)
    : [];
  const notRecommended = tripProfile?.not_recommended_filters
    ? excludeTags(tripProfile?.not_recommended_filters)
    : [];

  // TODO: add states to watch the changes
  // ? Where should we do the computation? Is this something the backend can support?

  const getTag = (status) => {
    switch (status) {
      case STATUS_MAP.selected_filters:
        return <Tag color='blue'>{STATUS_MAP.selected_filters.status}</Tag>;
      case STATUS_MAP.recommended_filters:
        return <Tag color='blue'>{STATUS_MAP.recommended_filters.status}</Tag>;
      case STATUS_MAP.not_recommended_filters:
        return (
          <Tag color='red'>{STATUS_MAP.not_recommended_filters.status}</Tag>
        );
      case STATUS_MAP.excluded_filters:
        return <Tag color='red'>{STATUS_MAP.excluded_filters.status}</Tag>;
      default:
        return;
    }
  };

  const getSrc = (status) => {
    switch (status) {
      case STATUS_MAP.selected_filters:
        return <Text>{STATUS_MAP.selected_filters.src}</Text>;
      case STATUS_MAP.recommended_filters:
        return <Text>{STATUS_MAP.recommended_filters.src}</Text>;
      case STATUS_MAP.not_recommended_filters:
        return <Text>{STATUS_MAP.not_recommended_filters.src}</Text>;
      case STATUS_MAP.excluded_filters:
        return <Text>{STATUS_MAP.excluded_filters.src}</Text>;
      default:
        return;
    }
  };

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Source',
      dataIndex: 'status',
      key: 'source',
      render: (_, { status }) => {
        return getSrc(status);
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => {
        return getTag(status);
      },
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag, idx) => {
            return <Tag key={idx}>{tag.name.toUpperCase()}</Tag>;
          })}
        </>
      ),
    },
  ];

  const data = [
    {
      key: 'experience-include',
      category: 'Experience',
      status: STATUS_MAP.selected_filters,
      tags: included.filter((tag) => tag.category === 'EXPERIENCE'),
    },
    {
      key: 'experience-recommended',
      category: 'Experience',
      status: STATUS_MAP.recommended_filters,
      tags: recommended.filter((tag) => tag.category === 'EXPERIENCE'),
    },
    {
      key: 'experience-not-recommended',
      category: 'Experience',
      status: STATUS_MAP.not_recommended_filters,
      tags: notRecommended.filter((tag) => tag.category === 'EXPERIENCE'),
    },
    {
      key: 'experience-exclude',
      category: 'Experience',
      status: STATUS_MAP.excluded_filters,
      tags: excluded.filter((tag) => tag.category === 'EXPERIENCE'),
    },
    {
      key: 'dinning-include',
      category: 'Dining',
      status: STATUS_MAP.selected_filters,
      tags: included.filter((tag) => tag.category === 'DINING'),
    },
    {
      key: 'dinning-recommended',
      category: 'Dining',
      status: STATUS_MAP.recommended_filters,
      tags: recommended.filter((tag) => tag.category === 'DINING'),
    },
    {
      key: 'dinning-not-recommended',
      category: 'Dining',
      status: STATUS_MAP.not_recommended_filters,
      tags: notRecommended.filter((tag) => tag.category === 'DINING'),
    },
    {
      key: 'dinning-exclude',
      category: 'Dining',
      status: STATUS_MAP.excluded_filters,
      tags: excluded.filter((tag) => tag.category === 'DINING'),
    },
  ];

  return (
    <Card title='Preferences'>
      <Table
        columns={columns}
        dataSource={data}
        bordered={false}
        pagination={false}
      />
    </Card>
  );
}

export default CardPreferences;
