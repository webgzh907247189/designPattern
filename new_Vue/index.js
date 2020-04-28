import { initState } from './observe/index'
import Watcher from './observe/watcher'

function Vue(options){
    this._init(options)
}

Vue.prototype._init = function(options){
    // vue 初始化，this.$options 标示的是vue中的参数
    let vm = this;
    vm.$options = options

    // 数据初始化
    initState(vm)

    // 开始渲染
    if(vm.$options.el){
        vm.$mount();
    }
}

// ?: 匹配不捕获
// var s = /\{\{([^}]+)\}\}/g
const defaultRe = /\{\{((?:.|\r?\n)+?)\}\}/g;
const util = {
    getValue(vm,expr){
        return expr.split('.').reduce((memo,current) => {
            memo = memo[current]
            return memo;
        },vm)
    },
    compileText(node,vm){
        node.textContent = node.textContent.replace(defaultRe,function(...args){
            return util.getValue(vm,args[1])
        }) 
    }
}
function compile(node,vm){
    let childNodes = node.childNodes

    Array.from(childNodes).forEach(child => {
        if(child.nodeType === 1){ // 1 -> 元素   3 -> 文本
            compile(child,vm) // 递归边缘
        }else if(child.nodeType === 3){
            util.compileText(child,vm)
        }
    });
}

Vue.prototype._update = function(){
    // 用户传入的数据去更新试图
    let vm = this;
    let el = vm.$el;

    let node = document.createDocumentFragment()

    let firstChild
    while (firstChild = el.firstChild) {
        node.appendChild(firstChild)
    }

    compile(node,vm)
    el.appendChild(node)
    // 需要使用 {{}} 的方式进行替换

}

Vue.prototype.$mount = function(){
    let vm = vm.$options.el;
    el = vm.$el = query(el);  // vm.$el 就是将要挂载的元素

    // 渲染通过watcher
    // 渲染watcher 用于渲染的watcher
    // vue 2.0 组件级别的更新

    let updateCom = () => {
        console.log('更新组件') //第一次渲染，后面是更新
        vm._update() // 更新组件
    }

    new Watcher(vm,updateCom) // 渲染watcher
}

function query(el){
    return typeof el === 'string' ? document.querySelector(el) : el;
}
export default Vue;




<script>
<script>
import { withRequest } from '@/service/utils';

const padding = styled.span`
    padding: 0 6px;
`;

const ss1 = {
    render(){
        console.log(this.props);
        return <div>
            2222
        </div>
    }
}

const ss = {
    methods: {
        aa() {
            return {props: {name: 'gzh'}}
        },
    },
    render(h) {
        const test = withRequest(ss1, this.aa);
        const obj = this.aa();

        return <div>
            111???1
            {
                h(test, obj)
            }
        </div>;
    },
};


export default {
    name: 'platformCheck',
    components: {
        categoryLeftCom,
        padding,
        ss,
    },
    computed: {
        ...mapGetters({
            getChannelList: GET_CHANNEL_LIST,
        }),
    },
    data() {
        return {
            checkList: [],
        };
    },
    methods: {
        onChange() {
            const resultObj = this.checkList.reduce((result, item) => {
                const obj = result;
                if (item.type === 'forecast') {
                    obj[item.type] = item.value;
                } else {
                    obj[item.type] = obj[item.type] ? [...obj[item.type], item.value] : [item.value];
                }
                return result;
            }, Object.create(null));

            this.$borderCast('platformCheckChannel', resultObj);
        },
    },
    render() {
        return (
            <div>
                <ss />
                <el-checkbox-group v-model={this.checkList} onChange={this.onChange}>
                    {this.getChannelList.map(item => (
                        <padding>
                            <el-checkbox label={item}>{item.name}</el-checkbox>
                        </padding>
                    ))}
                </el-checkbox-group>
            </div>
        );
    },
    created() {
        this.$store.dispatch(GET_CHANNEL_LIST);
    },
};
</script>
<style scoped lang="scss">
.order {
    background: #ececec;
}

/deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #ff6d6e;
}

/deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #ff6d6e;
    border-color: #ff6d6e;
}
</style>

</script>
