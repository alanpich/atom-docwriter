"use babel";

import {File} from 'atom';


export default function is_docwriter_project ( projectPath ) {
  return new File(projectPath+'/docwriter.yml').exists()
}
