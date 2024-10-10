import { Button, Layout, theme } from 'antd';
import './App.css';
import CommonAside from './compoemts/commonAside/CommAside';
import CommonHeader from './compoemts/commonHeader/commonHeader';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
