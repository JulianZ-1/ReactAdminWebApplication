import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Popconfirm, Table, Modal, InputNumber, Select, DatePicker } from 'antd'
import './user.css'
import { getUser, editUser, addUser, deleteUser } from '../../api'
import dayjs from 'dayjs'


interface UserData {
  id?: string;
  name: string;
  age: number;
  sex: number;
  birth: string;
  addr: string;
}

const User: React.FC = () => {
  const [listData, setListData] = useState<{ name: string }>({ name: '' });
  const [tableData, setTableData] = useState<UserData[]>([]); // <- Array of UserData
  const [modalText, setModalText] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleClick = (type: 'Add' | 'Edit', rowData: UserData | null) => {
    setModalOpen(true);
    if (type === 'Add') {
      setModalText(true);
      form.resetFields();
    } else if (rowData && type === "Edit") {
      setModalText(false);
      const clonedData = { ...rowData, birth: dayjs(rowData.birth) }; // <- Format BOD 
      form.setFieldsValue(clonedData);
    }
  };

  const handleDelete = (id: string) => {
    deleteUser(id).then(() => {
      getTableData();
    });
  };

  const getTableData = () => {
    getUser(listData).then(({ list }: { list: UserData[] }) => {
      setTableData(list);
    });
  };

  const handleOk = () => {
    form.validateFields().then((val: Omit<UserData, 'id'>) => {
      const updatedVal = { ...val, birth: dayjs(val.birth).format('YYYY-MM-DD') };
      if (modalText) {
        // Add user
        addUser(updatedVal).then(() => {
          handleCancel();
          getTableData();
        });
      } else {
        // Edit user
        editUser({ ...updatedVal, id: form.getFieldValue('id') }).then(() => {
          handleCancel();
          getTableData();
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    getTableData();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      render: (val: number) => (val   === 1 ? 'Female' : 'Male'),
    },
    {
      title: 'Date of Birth',
      dataIndex: 'birth',
    },
    {
      title: 'Address',
      dataIndex: 'addr',
    },
    {
      title: 'Edit',
      render: (rowData: UserData) => (
        <div className="flex-box">
          <Button style={{ marginRight: '5px' }} onClick={() => handleClick('Edit', rowData)}>Edit</Button>
          <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => handleDelete(rowData.id!)}>
            <Button type="primary" danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    }
  ];

  return (
    <div className="user">
      <div className="flex-box space-between">
        <Button type="primary" onClick={() => handleClick('Add', null)}>Add</Button>
      </div>
      <Table columns={columns} dataSource={tableData} rowKey={(record) => record.id!} />
      <Modal open={modalOpen} title={modalText ? 'Add new user' : 'Edit user'} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} labelAlign="left">
          {modalOpen && <Form.Item name="id" hidden><Input /></Form.Item>}
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter a user name' }]}>
            <Input placeholder="Enter user name" />
          </Form.Item>
          <Form.Item label="Age" name="age" rules={[{ required: true, message: 'Please enter an age' }, { type: 'number', message: 'Age must be a number' }]}>
            <InputNumber placeholder="Enter age" />
          </Form.Item>
          <Form.Item label="Sex" name="sex" rules={[{ required: true, message: 'Please select your sex' }]}>
            <Select options={[{ value: 0, label: 'Male' }, { value: 1, label: 'Female' }]} placeholder="Select your sex" />
          </Form.Item>
          <Form.Item label="DOB" name="birth" rules={[{ required: true, message: 'Please enter the user DOB' }]}>
            <DatePicker placeholder="Enter user DOB" />
          </Form.Item>
          <Form.Item label="Address" name="addr" rules={[{ required: true, message: 'Please enter the user address' }]}>
            <Input placeholder="Enter user address" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;