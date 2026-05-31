{
  var list = [
    {
      path: "/a",
    },
    {
      path: "/b",
      children: [
        {
          path: "/b1",
        },
        {
          path: "/b2",
        },
      ],
    },
    {
      path: "/e",
      children: [
        {
          path: "/e1",
          children: [
            {
              path: "/e11",
            },
          ],
        },
        {
          path: "/e2",
        },
      ],
    },
  ];
  const getPath = (list, prePath) => {
    return list.reduce((result, item) => {
      if (item.children) {
        return [
          ...result,
          ...getPath(item.children, prePath ? prePath + item.path : item.path),
        ];
      } else {
        result.push(
          prePath
            ? {
                path: prePath + item.path,
              }
            : item
        );
      }
      return result;
    }, []);
  };
  console.log(getPath(list));
  // [
  //     { path: '/a' },
  //     { path: '/b/b1' },
  //     { path: '/b/b2' },
  //     { path: '/e/e1/e11' },
  //     { path: '/e/e2' }
  // ]
}

{
  var list = [
    { id: 113, parentId: 2 },
    { id: "zzz", parentId: 2 },
    { id: "ffff", parentId: 3 },
    { id: 2, parentId: 1 },
    { id: 3, parentId: 1 },
    { id: 1, parentId: 0 },
  ];

  const getList = (list) => {
    return list.reduce((result, item) => {
        let id = item.id
        let flagList = list.filter(_ => _.parentId === id)
        if(flagList){
            result.push(item)
            item.children = flagList
        }
        return result
    }, [])
  }

  console.log(JSON.stringify(getList(list)))
}

{
    let list = [{id:1},{id:2, parentid: 1},{id: 3},{parentid: 3, id: 4}, {parentid: 4, id: 5}]

    const getList = (list) => {
        return list.reduce((result, item) => {

            let id = item.id
            let flagItem = list.find(_ => _.parentid === id)
            if(flagItem){
                item.children = flagItem

                if(!item.parentid){
                    result.push(item)
                }
            }
            return result
        }, [])
    }

    // console.log(JSON.stringify(getList(list)))
    console.log(getList(list))
}