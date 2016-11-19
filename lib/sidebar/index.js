'use babel';
import SidebarView from './views/sidebar'
import { workspace,CompositeDisposable } from 'atom';



export default
class Sidebar {

  constructor (state) {
    this.sidebarView = new SidebarView(state.sidebar);
    this.panel = atom.workspace.addLeftPanel({
      item: this.sidebarView.getElement(),
      visible: state.enabled
    })
  }



  isVisible () {
    return this.panel.isVisible();
  }

  show () {
    this.panel.show()
  }

  hide () {
    this.panel.hide()
  }

  destroy () {
    this.panel.destroy();
    this.sidebarView.destroy();
  }
}
