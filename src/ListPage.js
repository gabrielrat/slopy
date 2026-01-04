
import React from 'react';
import { Table } from 'antd';

const ListPage = ({ slopes }) => {
  const columns = [
    {
      title: 'Slope Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${record.latitude},${record.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Travel Time',
      dataIndex: 'travelTime',
      key: 'travelTime',
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      key: 'distance',
    },
  ];

  return <Table dataSource={slopes} columns={columns} rowKey="id" pagination={{ pageSize: 100 }} />;
};

export default ListPage;
