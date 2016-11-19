'use babel';

import Sidebar from './sidebar';
import { workspace,CompositeDisposable } from 'atom';

import isTreeViewOpen from './fn/is-tree-view-open';
import isDocWriterProject from './fn/is-docwriter-project';

export default {

  docWriterView: null,
  subscriptions: null,
  sidebar: null,
  enabled: false,

  openProjectFolders: [],

  activate(state) {
    this.sidebar = new Sidebar(state);


    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'docwriter:toggle': () => this.toggle()
    }));


    atom.packages.onDidActivateInitialPackages(()=>{
      this.doDeferredActivation();
    })
  },


  doDeferredActivation () {
    // Listen for projects being added/removed
    atom.project.onDidChangePaths((paths)=>{
      for(var k = 0; k < paths.length; k++) {
        if( this.openProjectFolders.indexOf(paths[k]) > -1) continue;
        if(isDocWriterProject(paths[k])){
          console.debug("DocWriter project detected");
          if(paths.length == 1)
            this.promptEnableDocWriter();
          else
            this.promptOpenProjectInOwnWindow();
        }
      }
    });


    var projects = atom.project.getPaths();
    if( projects.length == 1 && isDocWriterProject(projects[0])){
      this.promptEnableDocWriter();
    }
  },

  deactivate() {
    this.subscriptions.dispose();
    this.sidebar.destroy();
  },

  serialize() {
    return {
      enabled: false
      // docWriterViewState: this.docWriterView.serialize()
    };
  },

  toggle() {
    return this.enabled ? this.disable() : this.enable();
  },



  enable() {
    this.sidebar.show();

    if(isTreeViewOpen()){
      console.debug("Hiding TreeView")
      atom.commands.dispatch(atom.views.getView(atom.workspace),'tree-view:toggle')
    }


    this.enabled = true;
  },


  disable () {
    this.sidebar.hide();
    this.enabled = false;
  },



  promptEnableDocWriter () {
    atom.confirm({
      message: "That looks like a DocWriter project",
      detailedMessage: "Would you like to use DocWriter to work on it?",
      buttons: {
        Yes: () => {
          this.enable();
        },
        No: ()=>{}
      }
    })
  },


  promptOpenProjectInOwnWindow () {
    atom.confirm({
      message: "That looks like a DocWriter project",
      detailedMessage: "Would you like to use DocWriter to work on it?",
      buttons: {
        Yes: () => {
          alert("Opening in new window...")
        },
        No: ()=>{}
      }
    })
  }




};
