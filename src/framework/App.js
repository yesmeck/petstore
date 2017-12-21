import React from 'react';
import AppContainer from './AppContainer';

function sortMenus(menus) {
  menus.forEach((menu) => {
    if (menu.children) {
      menu.children = sortMenus(menu.children); // eslint-disable-line
    }
  });
  return menus.sort((a, b) => {
    const aPriority = a.priority || -1;
    const bPriority = b.priority || -1;
    return aPriority - bPriority;
  });
}

export default class Application {
  pages = [];
  menus = [];

  addPage(page) {
    if (Array.isArray(page)) {
      this.pages.push(...page);
    } else {
      this.pages.push(page);
    }
  }

  addMenu(menu) {
    if (menu.parentId) {
      const parent = this.menus.find(m => m.uid === menu.parentId);
      parent.children = parent.children || [];
      parent.children.push(menu);
    } else {
      this.menus.push(menu);
    }
  }

  render() {
    const req = require.context('../pages', true, /\.js$/);

    req.keys().forEach((mod) => {
      const path = mod.match(/^\.(.+)\.js$/)[1];
      const page = req(mod);
      if (page) {
        if (!page.path && page.setPath) {
          page.setPath(path);
        }
        this.addPage(page);
      }
    });

    this.menus = sortMenus(this.menus);

    return <AppContainer menus={this.menus} pages={this.pages} />;
  }
}
