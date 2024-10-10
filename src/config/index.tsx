import {
    HomeOutlined,
    UserOutlined,
    ShopOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';

// Define the type for each menu item
interface MenuItem {
    path: string;
    name: string;
    label: string;
    icon: ReactNode;
    url: string;
}

// Export the typed array of menu items
const menuConfig: MenuItem[] = [
    {
        path: '/home',
        name: 'home',
        label: 'Home',
        icon: <HomeOutlined />,
        url: '/home/index',
    },
    {
        path: '/mall',
        name: 'mall',
        label: 'Mall',
        icon: <ShopOutlined />,
        url: '/mall/index',
    },
    {
        path: '/user',
        name: 'user',
        label: 'User',
        icon: <UserOutlined />,
        url: '/user/index',
    },
    {
        path: '/other',
        name: 'other',
        label: 'Other',
        icon: <SettingOutlined />,
        url: '/other/index',
    },
];

export default menuConfig;