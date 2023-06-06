import React from 'react';
import { Tabs } from 'antd';
import ParsedRequirements from './ParsedRequirements';
import SuggestedDestinations from './SuggestedDestinations';

function ViewControl({ tripProfile }) {
  const items = [
    {
      key: '1',
      label: `Parse requirements`,
      children: <ParsedRequirements tripProfile={tripProfile} />,
    },
    {
      key: '2',
      label: `Suggest destinations`,
      children: <SuggestedDestinations tripProfile={tripProfile} />,
    },
    {
      key: '3',
      label: `Generate itinerary`,
      children: `To do`,
      disabled: true,
    },
  ];
  return <Tabs defaultActiveKey='1' items={items} />;
}

export default ViewControl;
