import React from 'react';
import dva from 'dva';
import { capitalize } from 'lodash';
import App from './App';
import Page from './Page';
import Menu from './Menu';
import Content from './Content';

const app = new App();
let currentPage = null;

export function bootstrap() {
  const dvaApp = dva({});
  dvaApp.model(require('../models/global'));
  dvaApp.router(app.render.bind(app));
  dvaApp.start('#root');
}

export function page(options, block) {
  currentPage = new Page(options);
  block();
  return currentPage;
}

export function menu(options) {
  const m = new Menu({ ...options, page: currentPage });
  app.addMenu(m);
  return m;
}

export function content(options, block) {
  currentPage.addContent(new Content(options, block));
}

export function resources(name) {
  const m = menu({ priority: 0, label: capitalize(name) });

  const listPage = page({ path: `/${name}` }, () => {
    menu({ label: 'List', parentId: m.uid });
    content({}, () => {
      return <div>list {name}</div>;
    });
  });

  const showPage = page({ path: `/${name}/:id` }, () => {
    content({}, () => {
      return <div>show {name}</div>;
    });
  });

  const newPage = page({ path: `/${name}/new` }, () => {
    menu({ label: 'New', parentId: m.uid });
    content({}, () => {
      return <div>new {name}</div>;
    });
  });

  const editPage = page({ path: `/${name}/:id/edit` }, () => {
    content({}, () => {
      return <div>edit {name}</div>;
    });
  });

  return [listPage, newPage, showPage, editPage];
}
