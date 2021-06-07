import { createRoute } from './history/base';

function addRouteRecord(route, pathMap, parent) {
    // 构建映射表  ->  二级路有 不带有 /  因为这时 手动添加了  /
    let path = parent ? parent.path + '/' + route.path : route.path;
    let record = {
        path,
        component: route.component,
        name: route.name,
        meta: route.meta,
        parent,
        props: route.props
    }

    if(!pathMap[path]){
        pathMap[path] = record
    }

    if(route.children){
        route.children.forEach((childRoute) => {
            addRouteRecord(childRoute, pathMap, record)
        })
    }
}

function createdRouteMap(routes, oldPtahMap) {
    let pathMap = oldPtahMap || {}

    routes.forEach((route) => {
        addRouteRecord(route, pathMap, null)
    })

    return {
        pathMap
    }
}

export function createMatcher(routes) {

    // 构建映射表
    let { pathMap } = createdRouteMap(routes)
    // console.log(pathMap, 'pathMap')

    function addRoutes(routes) {
        createdRouteMap(routes, pathMap)
    }

    function match(path) {
        let record = pathMap[path]

        return createRoute(record, { path })   
    }

    return {
        addRoutes,
        match
    }
}