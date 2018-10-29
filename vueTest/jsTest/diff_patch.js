{
	/**
	 * c d undefined
	 * typeA typeB 直接短路
	 */
	let a = document.getElementsByTagName('input')[0]
	let b = document.getElementsByTagName('input')[1]
	let c,d
	let typeA = (c = a.getAttributeNamesss) && a.type 
	let typeB = (d = b.getAttributeNamessssss) && b.type 

	{
		/**
		 * vue 的 patch -> sameVnode
		 *
		 * sameVnode 其实很简单，
		 * 只有当 key、 tag、 isComment（是否为注释节点）、 data同时定义（或不定义），
		 * 同时满足当标签类型为 input 的时候 type 相同（某些浏览器不支持动态修改<input>类型，所以他们被视为不同类型）即可。
		 */
		
		function sameVnode () {
		    return (
		        a.key === b.key &&
		        a.tag === b.tag &&
		        a.isComment === b.isComment &&
		        (!!a.data) === (!!b.data) &&
		        sameInputType(a, b)
		    )
		}

		function sameInputType (a, b) {
		    if (a.tag !== 'input') return true
		    let i
		    const typeA = (i = a.data) && (i = i.attrs) && i.type
		    const typeB = (i = b.data) && (i = i.attrs) && i.type
		    return typeA === typeB
		}
	}

}



{
	function patch (oldVnode, vnode, parentElm) {
	    if (!oldVnode) {
	        addVnodes(parentElm, null, vnode, 0, vnode.length - 1);
	    } else if (!vnode) {
	        removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1);
	    } else {
	        if (sameVnode(oldVNode, vnode)) {
	            patchVnode(oldVNode, vnode);
	        } else {
	            removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1);
	            addVnodes(parentElm, null, vnode, 0, vnode.length - 1);
	        }
	    }
	}
}



{	
	/**
	 * 在当新老 VNode 节点都是 isStatic（静态的），并且 key 相同时，只要将 componentInstance 与 elm 从老 VNode 节点“拿过来”即可。
	 * 
	 * 这里的 isStatic 也就是前面提到过的「编译」的时候会将静态节点标记出来，这样就可以跳过比对的过程。
	 */
	function patchVnode (oldVnode, vnode) {
	    if (oldVnode === vnode) {
	        return;
	    }

	    if (vnode.isStatic && oldVnode.isStatic && vnode.key === oldVnode.key) {
	        vnode.elm = oldVnode.elm;
	        vnode.componentInstance = oldVnode.componentInstance;
	        return;
	    }

	    const elm = vnode.elm = oldVnode.elm;
	    const oldCh = oldVnode.children;
	    const ch = vnode.children;

	    if (vnode.text) {
	        nodeOps.setTextContent(elm, vnode.text);
	    } else {
	        if (oldCh && ch && (oldCh !== ch)) {
	            updateChildren(elm, oldCh, ch);
	        } else if (ch) {
	            if (oldVnode.text) nodeOps.setTextContent(elm, '');
	            addVnodes(elm, null, ch, 0, ch.length - 1);
	        } else if (oldCh) {
	            removeVnodes(elm, oldCh, 0, oldCh.length - 1)
	        } else if (oldVnode.text) {
	            nodeOps.setTextContent(elm, '')
	        }
	    }
	}
}


{
	function updateChildren (parentElm, oldCh, newCh) {
	    let oldStartIdx = 0;
	    let newStartIdx = 0;
	    let oldEndIdx = oldCh.length - 1;
	    let oldStartVnode = oldCh[0];
	    let oldEndVnode = oldCh[oldEndIdx];
	    let newEndIdx = newCh.length - 1;
	    let newStartVnode = newCh[0];
	    let newEndVnode = newCh[newEndIdx];
	    let oldKeyToIdx, idxInOld, elmToMove, refElm;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	        if (!oldStartVnode) {
	            oldStartVnode = oldCh[++oldStartIdx];
	        } else if (!oldEndVnode) {
	            oldEndVnode = oldCh[--oldEndIdx];
	        } else if (sameVnode(oldStartVnode, newStartVnode)) {
	            patchVnode(oldStartVnode, newStartVnode);
	            oldStartVnode = oldCh[++oldStartIdx];
	            newStartVnode = newCh[++newStartIdx];
	        } else if (sameVnode(oldEndVnode, newEndVnode)) {
	            patchVnode(oldEndVnode, newEndVnode);
	            oldEndVnode = oldCh[--oldEndIdx];
	            newEndVnode = newCh[--newEndIdx];
	        } else if (sameVnode(oldStartVnode, newEndVnode)) {
	            patchVnode(oldStartVnode, newEndVnode);
	            nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	            oldStartVnode = oldCh[++oldStartIdx];
	            newEndVnode = newCh[--newEndIdx];
	        } else if (sameVnode(oldEndVnode, newStartVnode)) {
	            patchVnode(oldEndVnode, newStartVnode);
	            nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	            oldEndVnode = oldCh[--oldEndIdx];
	            newStartVnode = newCh[++newStartIdx];
	        } else {
	            let elmToMove = oldCh[idxInOld];
	            if (!oldKeyToIdx) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	            idxInOld = newStartVnode.key ? oldKeyToIdx[newStartVnode.key] : null;
	            if (!idxInOld) {
	                createElm(newStartVnode, parentElm);
	                newStartVnode = newCh[++newStartIdx];
	            } else {
	                elmToMove = oldCh[idxInOld];
	                if (sameVnode(elmToMove, newStartVnode)) {
	                    patchVnode(elmToMove, newStartVnode);
	                    oldCh[idxInOld] = undefined;
	                    nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
	                    newStartVnode = newCh[++newStartIdx];
	                } else {
	                    createElm(newStartVnode, parentElm);
	                    newStartVnode = newCh[++newStartIdx];
	                }
	            }
	        }
	    }

	    if (oldStartIdx > oldEndIdx) {
	        refElm = (newCh[newEndIdx + 1]) ? newCh[newEndIdx + 1].elm : null;
	        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx);
	    } else if (newStartIdx > newEndIdx) {
	        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	}
}