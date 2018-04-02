import React from 'react'
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import routes from "./router"


import S from "./components/styled-components"
const Main = () => <h2>Main</h2>

const Sandwiches = () => <h2>styled-components</h2>

const Tacos = ({ routes }) => (
    <div>
      <h2>Tacos</h2>
      <ul>
        <li><Link to="/tacos/bus">Bus</Link></li>
        <li><Link to="/tacos/cart">Cart</Link></li>
      </ul>

        {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route}/>
        ))}
    </div>
)

const Bus = () => <h3>Bus</h3>
const Cart = () => <h3>Cart</h3>

const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={props => (

        <route.component {...props} routes={route.routes}/>
    )}/>
)

const RouteConfigExample = () => (
    <Router>
      <div>
        <ul>
          <li><Link to="/tacos">Tacos</Link></li>
          <li><Link to="/sandwiches">Sandwiches</Link></li>
        </ul>

          {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route}/>
          ))}
      </div>
    </Router>
)

export default RouteConfigExample







/*
import { Layout, Menu, Icon } from 'antd';
import "./App.css"
const { Header, Sider, Content } = Layout;

export  default  class SiderDemo extends React.Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu  mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        Content
                    </Content>
                </Layout>
            </Layout>
        );
    }
}







*/
