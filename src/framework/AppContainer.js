import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'dva/router';
import BasicLayout from '../layouts/BasicLayout';

export default class AppContainer extends React.Component {
  static childContextTypes = {
    pages: PropTypes.any,
    menus: PropTypes.any,
  }

  getChildContext() {
    return {
      pages: this.props.pages,
      menus: this.props.menus,
    };
  }

  render() {
    const { pages, menus } = this.props;

    return (
      <Router>
        <Route
          render={() => (
            <BasicLayout>
              <Switch>
                {pages.map(page => (
                  <Route
                    exact
                    key={page.path}
                    path={page.path}
                    render={page.render.bind(page)}
                  />
                ))}
              </Switch>
            </BasicLayout>
          )}
        />
      </Router>
    );
  }
}
