'use babel';

import OutlinePanel from './outline-panel-element';
import {CompositeDisposable} from 'atom';

export default class SidebarView {

  constructor(state) {

    this.disposable = new CompositeDisposable();

    // Create root element
    this.element = document.createElement('atom-panel');
    // this.element.classList.add('inset-panel');
    this.element.classList.add('docwriter','sidebar');

    this.header = document.createElement('header');
    this.element.appendChild(this.header);

    this.content = document.createElement('section');
    this.element.appendChild(this.content);


    this.outlinePanel = new OutlinePanel();
    this.content.appendChild(this.outlinePanel.element);


    this.footer = document.createElement('footer')
    this.element.appendChild(this.footer);

    this.footer.innerHTML = "\
        <div class='btnbar'>\
          <button class='btn icon icon-git-compare'></button>\
          <button class='btn icon icon-repo-push'></button>\
          <button class='btn icon icon-package'></button>\
          <button class='btn icon icon-tools'></button>\
        </div>";
    this.disposable.add(atom.tooltips.add(this.footer.querySelector('.btn.icon-git-compare'), {
        title:'Synchronise',
        keyBindingCommand: 'docwriter:document.synchronise'}));
    this.disposable.add(atom.tooltips.add(this.footer.querySelector('.btn.icon-repo-push'), {
        title:'Push Changes',
        keyBindingCommand: 'docwriter:document.push'}));
    this.disposable.add(atom.tooltips.add(this.footer.querySelector('.btn.icon-package'), {
        title:'Publish',
        keyBindingCommand: 'docwriter:document.publish'}));
    this.disposable.add(atom.tooltips.add(this.footer.querySelector('.btn.icon-tools'), {
        title:'Edit Document Settings',
        keyBindingCommand: 'docwriter:document.settings'}));

  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
    this.disposable.dispose();
  }

  getElement() {
    return this.element;
  }

}
