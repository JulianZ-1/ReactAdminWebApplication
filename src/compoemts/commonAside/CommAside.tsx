import { Menu, Layout } from 'antd';
import MenuConfig from "../../config"; // Assuming this is a properly typed array of menu items
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useDispatch } from 'react-redux';

const { Sider } = Layout;

// Define the type for MenuConfig items
interface MenuItem {
    path: string;
    label: string;
    icon?: React.ReactNode; // Icon can be optional and React node type
}

// Explicitly type the items generated from MenuConfig
const items = MenuConfig.map((item: MenuItem) => ({
    key: item.path,
    label: item.label,
    icon: item.icon
}));

// Props for the CommonAside component
type CommonAsideProps = {
    tabClose: boolean;
};

const CommonAside: React.FC<CommonAsideProps> = ({ tabClose }) => {
    const navigate = useNavigate();

    // Handling the menu selection with proper typing for MenuInfo
    const selectMenu = (e: MenuInfo) => {
        const selectedPath = e.keyPath[e.keyPath.length - 1];
        const data = MenuConfig.find(item => item.path === selectedPath);

        if (data) {
            navigate(data.path); // Navigate to the selected menu item's path
        }
    };

    return (
        <Sider trigger={null} collapsed={tabClose}>
            <h3 className="app-name">Admin</h3>
            <Menu
                theme="dark"
                style={{
                    height: '100%',
                }}
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
                onClick={selectMenu}
            />
        </Sider>
    );
};

export default CommonAside;