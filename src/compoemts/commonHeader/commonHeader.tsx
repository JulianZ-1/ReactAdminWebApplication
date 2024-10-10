import { LeftOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Layout } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux'
import './commonHeader.css';
import { setIsCollapse } from '../../store/reducers/tab';

const { Header } = Layout;

type commonHeaderProps = {
    tabOpen: boolean
}

const CommonHeader: React.FC<commonHeaderProps> = (tabOpen) => {
    const dispatch = useDispatch();

    const setOpen = () => {
        dispatch(setIsCollapse())
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank">
                    Home page
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" onClick={() => console.log('hello world')}>
                    Log out
                </a>
            ),
        },
    ];

    return (
        <Header className="header-container">
            <Button
                icon={<LeftOutlined />}
                type="text"
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 32,
                    backgroundColor: '#fff'
                }}
                onClick={() => setOpen()}
            />
            <Dropdown menu={{ items }}>
                <Avatar size={36} icon={<UserOutlined />} />
            </Dropdown>
        </Header>
    )
}

export default CommonHeader
