import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import cloneDeep from 'lodash/cloneDeep';
import { getNavData } from './common/nav';
import { getPlainNode } from './utils/utils';
import BasicLayout from './layouts/BasicLayout';
import Home from './routes/Home';
import List from './routes/List';
import New from './routes/New';
import NotFound from './routes/Exception/404';

import styles from './index.less';

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function getRouteData(navData, path) {
  if (
    !navData.some(item => item.layout === path) ||
    !navData.filter(item => item.layout === path)[0].children
  ) {
    return null;
  }
  const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(route.children);
  return nodeList;
}

function getLayout(navData, path) {
  if (
    !navData.some(item => item.layout === path) ||
    !navData.filter(item => item.layout === path)[0].children
  ) {
    return null;
  }
  const route = navData.filter(item => item.layout === path)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  };
}

function RouterConfig({ history, app }) {
  const passProps = { app };

  const routes = Object.keys(window.schema.definitions).reduce((acc, key) => {
    const path = key.toLowerCase();
    acc.push(
      <Route
        exact
        key={`${path}-new`}
        path={`/${path}/new`}
        render={() => <div>{key} new</div>}
      />
    );
    acc.push(
      <Route
        exact
        key={`${path}-list`}
        path={`/${path}/list`}
        render={() => <div>{key} list</div>}
      />
    );
    return acc;
  }, []);

  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route
            render={props => (
              <BasicLayout {...props} {...passProps}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  {routes}
                  <Route component={NotFound} />
                </Switch>
              </BasicLayout>
            )}
          />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
