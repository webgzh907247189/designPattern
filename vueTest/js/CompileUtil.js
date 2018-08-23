CompileUtil = {
    getVal (vm, exp) { // 获取实例上对应的数据
        exp = exp.split('.');
        return exp.reduce((prev, next) => {
            return prev[next];
        }, vm.$data);
    },
    setVal (vm, exp, newVal) { // 设置实例上对应的数据
        exp = exp.split('.');

        let result = exp.reduce((prev, next, currentIndex) => {
            if(currentIndex === exp.length - 1) {
                return prev[next] = newVal;
            }
            return prev[next];
        }, vm.$data);
        return result
    },
    getTextVal (vm, exp) { // 获取编译文本后的结果
        return exp.replace(/\{\{([^}]+)\}\}/g, (...arg) => {
            return this.getVal(vm, arg[1]);
        });
    },


    text (node, vm, exp) { //文本处理
        let updateFn = this.updater['textUpdater'];
        let value = this.getTextVal(vm, exp);

        // console.log(value,'value',exp)
        exp.replace(/\{\{([^}]+)\}\}/g, (...arg) => {
            new Watcher(vm, arg[1], newValue => {
                // 如果数据变化了，文本节点应该重新获取依赖的数据更新文本中的内容
                updateFn && updateFn(node, newValue);
            });
        });

        updateFn && updateFn(node, value);
    },
    model (node, vm, exp) { // 输入框处理
        let updateFn = this.updater['modelUpdater'];
        let value = this.getVal(vm, exp);
        // console.log(value,'222',exp)

        // 这里应该加一个监控，数据变化了，应该调用 watch 的回调
        new Watcher(vm, exp, newValue => {
            updateFn && updateFn(node, newValue);
        });
        // 添加输入框事件实现双向绑定
        node.addEventListener('input', e => {
            let newValue = e.target.value;

            // console.log(newValue,'newValue')
            this.setVal(vm, exp, newValue);
        });
        // 防止没有的指令解析时报错
        
        // console.log('11111111111111',node,'222',value)
        updateFn && updateFn(node, value);
    },


    updater: {
        // 文本更新
        textUpdater (node, value) {
            // console.log(value,'11',node)
            node.textContent = value;
        },
        // 输入框更新
        modelUpdater (node, value) {
            node.value = value;
        }
    }
};