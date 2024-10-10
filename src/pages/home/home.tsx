import { Col, Row, Card, Table } from 'antd';
import { UserOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import './home.css';
import { getData } from '../../api'; // Assuming you have this function defined somewhere
import axios from 'axios';

// Define interfaces for the data types
interface TableDataItem {
  name: string;
  todayBuy: number;
  monthBuy: number;
  totalBuy: number;
}

interface CountDataItem {
  name: string;
  value: number;
  icon: JSX.Element;
  color: string;
}

const columns = [
  {
    title: 'Product',
    dataIndex: 'name',
  },
  {
    title: 'Daily sales',
    dataIndex: 'todayBuy',
  },
  {
    title: 'Monthly sales',
    dataIndex: 'monthBuy',
  },
  {
    title: 'Total sales',
    dataIndex: 'totalBuy',
  },
];

// Define the count data with proper typing
const countData: CountDataItem[] = [
  {
    name: "Today's confirmed order",
    value: 1234,
    icon: <CheckCircleOutlined />,
    color: '#2ec7c9',
  },
  {
    name: "Today's order",
    value: 3421,
    icon: <ClockCircleOutlined />,
    color: '#ffb980',
  },
  {
    name: "Today's unpaid order",
    value: 1234,
    icon: <CloseCircleOutlined />,
    color: '#5ab1ef',
  },
  {
    name: 'Monthly confirmed order',
    value: 1234,
    icon: <CheckCircleOutlined />,
    color: '#2ec7c9',
  },
  {
    name: 'Monthly order',
    value: 3421,
    icon: <ClockCircleOutlined />,
    color: '#ffb980',
  },
  {
    name: 'Monthly unpaid order',
    value: 1234,
    icon: <CloseCircleOutlined />,
    color: '#5ab1ef',
  },
];

const Home: React.FC = () => {
  const today = new Date();
  const [tableData, setTableData] = useState<TableDataItem[]>([]);

  useEffect(() => {
    axios
      .get('/home/getData')
      .then((response) => {
        setTableData(response.data.data.tableData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable>
          <div className="user">
            <UserOutlined
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                marginRight: '40px',
                fontSize: '800%',
                paddingLeft: '50px',
              }}
            />
            <div className="userinfo">
              <p className="name">Julian</p>
              <p className="role">Admin</p>
            </div>
          </div>
          <div className="loginInfo">
            <p>
              <span>Today's Date: {today.toLocaleDateString()}</span>
            </p>
          </div>
          <div className="loginInfo">
            <p>
              <span>Last login Location: Brisbane</span>
            </p>
          </div>
        </Card>
        <Card>
          <Table rowKey="name" columns={columns} dataSource={tableData} pagination={false} />
        </Card>
      </Col>
      <Col span={16}>
        <div className="num">
          {countData.map((item, index) => (
            <Card key={index}>
              <div className="icon-box" style={{ backgroundColor: item.color }}>
                {item.icon}
              </div>
              <div className="detail">
                <p className="num">${item.value}</p>
                <p className="txt">{item.name}</p>
              </div>
            </Card>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default Home;