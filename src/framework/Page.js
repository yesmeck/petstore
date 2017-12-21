import React from 'react';

export default class Page {
  constructor({ path }) {
    this.path = path;
  }

  setPath(path) {
    this.path = path;
  }

  addMenu(menu) {
    this.menu = menu;
  }

  addContent(content) {
    this.content = content;
  }

  render() {
    return this.content.render();
  }
}
