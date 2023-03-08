const createChildrensTree = (obj, key) => {

  // obj -> {id: 'TJgnsnkSdxWAhufunwr2h', name: 'Project 1', folders: Array(2), files: Array(1), depth: 0}
  // children-> 0{title: 'folder 1', key: '0-0-0', id: 'NzqYrzOzYPcE9cCw2h0ud', children: Array(1)}
  if (!obj.folders) return;

  let children = [];
  if (obj.folders.length > 0) {
    console.log("🚀 ~ file: createChildrensTree.js:9 ~ createChildrensTree ~ obj:", obj)
    let keyCode = `${key}-${'0'.repeat(obj.depth)}`;
    // let keyCode = `0-`.repeat(key + 2);

    children = obj.folders.map((child, index) => {
      console.log("🚀 ~ file: SideBar.js:154 ~ children ~ child:", child);

      return {
        title: child.name,
        key: `${keyCode}${index}`,
        id: child.id,
        ...(children  && {
          children: createChildrensTree(child, keyCode),
          // children: createChildrensTree(child, child.depth),
        }),
      };
    });
  
      return children;
    
  }
  return;
};

export default createChildrensTree