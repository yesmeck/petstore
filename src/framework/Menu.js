let uid = 0;

export default class Menu {
  constructor({ priority, label, parentId, page }) {
    uid += 1;
    this.uid = uid;
    this.parentId = parentId;
    this.priority = priority;
    this.label = label;
    this.page = page;
  }
}
