'use babel';

export default function () {
  var panels = atom.workspace.getLeftPanels();
  for(var k = 0; k < panels.length; k++) {
    if( panels[k].item['resizeTreeView'] != undefined){
      return true;
    }
  }
  return false;
}
