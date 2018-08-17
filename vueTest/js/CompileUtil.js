CompileUtil = {};

// 更新节点数据的方法
CompileUti.updater = {
    // 文本更新
    textUpdater(node, value) {
        node.textContent = value;
    },
    // 输入框更新
    modelUpdater(node, value) {
        node.value = value;
    }
};



// 获取 data 值的方法
CompileUtil.getVal = function (vm, exp) {
    // 将匹配的值用 . 分割开，如 vm.data.a.b
    exp = exp.split(".");

    // 归并取值
    return exp.reduce((prev, next) => {
        return prev[next];
    }, vm.$data);
};

// 获取文本 {{}} 中变量在 data 对应的值
CompileUtil.getTextVal = function (vm, exp) {
    // 使用正则匹配出 {{ }} 间的变量名，再调用 getVal 获取值
    return exp.replace(/\{\{([^}]+)\}\}/g, (...args) => {
        return this.getVal(vm, args[1]);
    });
};

// 设置 data 值的方法
CompileUtil.setVal = function (vm, exp, newVal) {
    exp = exp.split(".");
    return exp.reduce((prev, next, currentIndex) => {
        // 如果当前归并的为数组的最后一项，则将新值设置到该属性
        if(currentIndex === exp.length - 1) {
            return prev[next] = newVal;
        }

        // 继续归并
        return prev[next];
    }, vm.$data);
}



// 处理 v-model 指令的方法
CompileUtil.model = function (node, vm, exp) {
    // 获取赋值的方法
    let updateFn = this.updater["modelUpdater"];

    // 获取 data 中对应的变量的值
    let value = this.getVal(vm, exp);

    // 添加观察者，作用与 text 方法相同
    new Watcher(vm, exp, newValue => {
        updateFn && updateFn(node, newValue);
    });

    // v-model 双向数据绑定，对 input 添加事件监听
    node.addEventListener('input', e => {
        // 获取输入的新值
        let newValue = e.target.value;

        // 更新到节点
        this.setVal(vm, exp, newValue);
    });

    // 第一次设置值
    updateFn && updateFn(vm, value);
};



// 处理文本节点 {{}} 的方法
CompileUtil.text = function (node, vm, exp) {
    // 获取赋值的方法
    let updateFn = this.updater["textUpdater"];

    // 获取 data 中对应的变量的值
    let value = this.getTextVal(vm, exp);

    // 通过正则替换，将取到数据中的值替换掉 {{ }}
    exp.replace(/\{\{([^}]+)\}\}/g, (...args) => {
        // 解析时遇到了模板中需要替换为数据值的变量时，应该添加一个观察者
        // 当变量重新赋值时，调用更新值节点到 Dom 的方法
        new Watcher(vm, args[1], newValue => {
            // 如果数据发生变化，重新获取新值
            updateFn && updateFn(node, newValue);
        });
    });

    // 第一次设置值
    updateFn && updateFn(vm, value);
};
