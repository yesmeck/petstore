import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { Link } from 'dva/router';
import logo from '../../assets/logo.svg';
import styles from './index.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderMenu extends Component {
  static contextTypes = {
    menus: PropTypes.any,
  }

  onCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  }

  renderMenus(menus) {
    return (menus || this.context.menus).map((menu) => {
      if (menu.children) {
        return (
          <SubMenu
            key={menu.uid}
            title={menu.label}
          >
            {this.renderMenus(menu.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={menu.uid}>
            <Link to={menu.page.path}>
              <span>{menu.label}</span>
            </Link>
          </Menu.Item>
        );
      }
    });
  }

  render() {
    const { collapsed } = this.props;

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        onCollapse={this.onCollapse}
        width={256}
        className={styles.sider}
      >
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.renderMenus()}
        </Menu>
      </Sider>
    );
  }
}
