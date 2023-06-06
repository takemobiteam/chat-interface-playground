import { Card } from 'antd';

import { Form, Switch, InputNumber } from 'antd';
import { useState } from 'react';

function CardWho({ tripProfile }) {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  let adultCnt = tripProfile?.traveler_information.adults;
  let childrenCnt = tripProfile?.traveler_information.children;

  return (
    <Card title='Who'>
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
      >
        <Form.Item label='Number of adults' required>
          <InputNumber min={0} value={adultCnt} />
        </Form.Item>
        <Form.Item label='Number of children' required tooltip='Under 12'>
          <InputNumber min={0} value={childrenCnt} />
        </Form.Item>
        <Form.Item
          label='Has pet'
          required
          tooltip='Service animals are not pets'
        >
          <Switch disabled />
        </Form.Item>
      </Form>
    </Card>
  );
}

export default CardWho;
