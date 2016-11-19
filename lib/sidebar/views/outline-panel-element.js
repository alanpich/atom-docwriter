"use babel";

import View from 'atom';

export default
class OverviewPanel {

  constructor () {
    this.element = document.createElement('atom-panel');
    // this.element.classList.add('inset-panel');

    this.headingEl = document.createElement('div');
    this.headingEl.classList.add('panel-heading');
    this.headingEl.innerHTML = "Outline";
    this.element.appendChild(this.headingEl);

    this.bodyEl = document.createElement('div');
    this.bodyEl.classList.add('panel-body','padded');
    this.element.appendChild(this.bodyEl);
    this.bodyEl.innerHTML = '<ul class="list-tree has-collapsable-children">\
      <li class="list-nested-item">\
          <div class="list-item">Introduction</div>\
      </li>\
      <li class="list-nested-item">\
        <div class="list-item">Configuration</div>\
          <ul class="list-tree">\
              <li class="list-nested-item">\
                  <div class="list-item">Config Schema</div>\
              </li>\
              <li class="list-nested-item collapsed">\
                  <div class="list-item">Collapsed Nested Directory</div>\
                  <ul class="list-tree">\
                      <li class="list-item">File one</li>\
                  </ul>\
              </li>\
              <li class="list-item">File one</li>\
              <li class="list-item">File three .selected!</li>\
          </ul>\
      </li>\
      <li class="list-nested-item collapsed">\
          <div class="list-item">Key Experiences</div>\
      </li>\
      <li class="list-nested-item collapsed">\
          <div class="list-item">Service Interfaces</div>\
      </li>\
      <li class="list-nested-item collapsed">\
          <div class="list-item">Coordinator Interfaces</div>\
      </li>\
      <li class="list-nested-item collapsed">\
          <div class="list-item">Hardware Function</div>\
      </li>\
    </ul>';
  }


}
