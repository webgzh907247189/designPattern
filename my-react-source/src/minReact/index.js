const m = (...args)=>{
    let [attrs, [head, ...tail]] = [{}, args]
    let [tag, ...classes] = head.split('.')
    if (tail.length && !m.isRenderable(tail[0])) [attrs, ...tail] = tail
    if (attrs.class) classes = [...classes, ...attrs.class]
    
    attrs = {...attrs}; delete attrs.class

    const children = []
    const addChildren = v=>v === null? null : Array.isArray(v)? v.map(addChildren) : children.push(v)
    addChildren(tail)
    return {__m: true, tag: tag || 'div', attrs, classes, children}
}

m.isRenderable = v =>v === null || ['string', 'number'].includes(typeof v) || v.__m || Array.isArray(v)


m.update = (el, v)=>{

    if (!v.__m) return el.data === `${v}` || (el.data = v)

    // set the class names
    for (const name of v.classes) if (!el.classList.contains(name)) el.classList.add(name)
    for (const name of el.classList) if (!v.classes.includes(name)) el.classList.remove(name)

    // set the attributes
    for (const name of Object.keys(v.attrs)) if (el[name] !== v.attrs[name]) el[name] = v.attrs[name]
    for (const {name} of el.attributes) if (!Object.keys(v.attrs).includes(name) && name !== 'class') el.removeAttribute(name)
}


m.makeEl = v=>v.__m? document.createElement(v.tag) : document.createTextNode(v)

m.render = (parent, v)=>{
    const olds = parent.childNodes || []  // a)
    const news = v.children || []  // a)
    for (const _ of Array(Math.max(0, olds.length - news.length))) parent.removeChild(parent.lastChild)  // b)
    for (const [i, child] of news.entries()){  // c)
        let el = olds[i] || m.makeEl(child)  // 1)
        if (!olds[i]) parent.appendChild(el)  // 2)
        const mismatch = (el.tagName || '') !== (child.tag || '').toUpperCase()  // 3)
        if (mismatch) (el = m.makeEl(child)) && parent.replaceChild(el, olds[i])  // 3)
        m.update(el, child)  // 4)
        m.render(el, child)  // 5)
    }
}


class toDoDemo {
    constructor() {
      this.todos = []
      this.render = () => m.render(
        document.getElementById('example'),
        {children: [this.showToDos()]},
      )
      this.render()
    }
  
    showToDos() {
      return m('div', [
        m('h3', 'ToDo示例'),
        m('input', { placeholder: '添加todo' }),
        m('button',
          {
            onclick: (e) => this.addTodo(e)
          },
          '+'
         ),
        m('ul',
          this.todos.map((item, i) => m('li', [
            m('span', item),
            m('button',
              {
                onclick: () => this.removeTodo(i)
              },
              '-'
             )
          ])))
        ])
    }
  
    removeTodo(i) {
      this.todos.splice(i,1)
      this.render()
    }
  
    addTodo(e) {
      const input = e.target.previousSibling
      const todo = input.value
      if(!todo.trim()) return
      input.value = ''
      this.todos.push(todo)
      this.render()
    }
  }
  
  new toDoDemo()