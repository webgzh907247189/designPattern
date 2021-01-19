import { onMounted, Ref } from 'vue';
import { Store } from 'vuex';
import _ from 'lodash';
import { GlobalState } from "../store";

export const loadMore = (ele: Ref<null | HTMLElement>, store: Store<GlobalState>, type: string) => {
    let element: HTMLElement;

    function _loadMore(){
        let containerHeight = element.clientHeight;
        let scrollTop = element.scrollTop;

        // 整个高度
        let scrollHeight = element.scrollHeight;

        if (scrollTop + containerHeight + 20 >= scrollHeight) {
            console.log('开始请求数据了')
            store.dispatch(type);
        }
    }

    onMounted(() => {
        element = ele.value as HTMLElement
        element.addEventListener('scroll', _.debounce(_loadMore, 200))
    })
}