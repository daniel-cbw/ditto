import { Component, Input } from '@angular/core';
import { TreeNode, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

const actionMapping:IActionMapping = {
  mouse: {
    // contextMenu: (tree, node, $event) => {
    //   $event.preventDefault();
    //   alert(`context menu for ${node.data.name}`);
    // },
    dblClick: (tree, node, $event) => {
      if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
    },
    click: (tree, node, $event) => {
      $event.shiftKey
        ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
        : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event)
    }
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  }
};

@Component({
  selector: 'app-fulltree',
  templateUrl: './fulltree.component.html',
  styleUrls: ['./fulltree.component.css'],
})
export class FullTreeComponent {
  nodes: any[];
  //nodes2 = [{name: 'root'}, {name: 'root2'}];
  constructor() {

    
    
  }
  ngOnInit() {
    setTimeout(() => {
      this.nodes = [
        {
          expanded: true,
          name: 'root expanded',
          subTitle: 'the root',
          children: [
            // {
            //   name: 'child1',
            //   subTitle: 'a good child',
            //   hasChildren: true
            // }, {
            //   name: 'child2',
            //   subTitle: 'a bad child',
            //   hasChildren: true
            // }
          ]
        },
        // {
        //   name: 'root2',
        //   subTitle: 'the second root',
        //   children: [
        //     {
        //       name: 'child2.1',
        //       subTitle: 'new and improved',
        //       hasChildren: false
        //     }, {
        //       name: 'child2.2',
        //       subTitle: 'new and improved2',
        //       children: [
        //         {
        //           uuid: 1001,
        //           name: 'subsub',
        //           subTitle: 'subsub',
        //           hasChildren: false
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   name: 'asyncroot',
        //   hasChildren: true
        // }
      ];

      // for(let i = 0; i < 4; i++) {
      //   this.nodes.push({
      //     name: `rootDynamic${i}`,
      //     subTitle: `root created dynamically ${i}`,
      //     children: new Array((i + 1) * 100).fill(null).map((item, n) => ({
      //       name: `childDynamic${i}.${n}`,
      //       subTitle: `child created dynamically ${i}`,
      //       hasChildren: false
      //     }))
      //   });
      // }
    }, 1);
  }

  asyncChildren = [
    // {
    //   name: 'child2.1',
    //   subTitle: 'new and improved'
    // }, {
    //   name: 'child2.2',
    //   subTitle: 'new and improved2'
    // },
    // {
    //   name: 'child2.1',
    //   subTitle: 'new and improved'
    // }
  ];

  getChildren(node:any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.asyncChildren.map((c) => {
        return Object.assign({}, c, {
          hasChildren: node.level < 5
        });
      })), 1000);
    });
  }

  addNode( tree, treemodel, node, placement ) {

    let DOMhierarchy: Object;
    let activeNodes: Object = tree.treeModel.activeNodes;
    
    var kyz = Object.keys(activeNodes);
    let activeNode: Object;

    // only get first active;
    activeNode = activeNodes[ kyz[ 0 ] ];

    console.log(activeNode);

    switch(placement) { 
     case "section": { 
        console.log("Excellent"); 
        break; 
     } 
     case "step": { 
        console.log("Good"); 
        break; 
     } 
     case "component": {
        console.log("Fair"); 
        break;    
     } 
    }

    //if ( !node.isCollapsed ) {
      node.data.children.push({
        name: 'a new child',
        hasChildren: true,
      });
    //}
   console.log(node);
    tree.treeModel.update();
  }

  childrenCount(node: TreeNode): string {
    return node && node.children ? `(${node.children.length})` : '';
  }

  filterNodes(text, tree) {
    tree.treeModel.filterNodes(text);
  }

  activateSubSub(tree) {
    // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
    tree.treeModel.getNodeById(1001)
      .setActiveAndVisible();
  }

  customTemplateStringOptions: ITreeOptions = {
    // displayField: 'subTitle',
    isExpandedField: 'expanded',
    idField: 'uuid',
    getChildren: this.getChildren.bind(this),
    actionMapping,
    nodeHeight: 23,
    allowDrag: true,
    useVirtualScroll: true,
    animateExpand: true,
    animateSpeed: 30,
    animateAcceleration: 1.2
  }
  onEvent(event) {
    //console.log(event);
  }

  go($event) {
    $event.stopPropagation();
    alert('this method is on the app component');
  }

  activeNodes(treeModel) {
    console.log(treeModel.activeNodes);
  }
}
