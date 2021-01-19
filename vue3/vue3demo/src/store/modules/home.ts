import { Module } from 'vuex';
import { GlobalState } from '../index';

type iList = { url: string };
type listProfileItem = { name: string };

export type HomeState = {
    name: string,
    list: iList[],
    listProfile: listProfileItem[],
}

const state: HomeState = {
    name: '?home?',
    list: [{url: '11'}],
    listProfile: [{name: '11'}, {name: '22'},{name: '33'}, {name: '44'},{name: '55'}, {name: '66'},{name: '77'}, {name: '88'},  {name: '99'},  {name: '10'}],
}

export const SET_NAME = 'set_name';
export const ACTION_SET_NAME = 'action_set_name';
export const GET_LIST = 'get_list';
export const SET_LIST = 'set_list';

const home: Module<HomeState, GlobalState> = {
    namespaced: true,
    state,
    mutations: {
        [SET_NAME](state, payload: string){
            state.name = payload;
        },
        [SET_LIST](state, payload: string){
            const oldidx = state.listProfile[state.listProfile.length - 1].name;

            const newList = [] as listProfileItem[];
            for(let i = 0; i <= 5; i++){
                newList.push({ name: parseInt(oldidx) + i + 1  + '' })
            }
            state.listProfile = state.listProfile.concat(newList);
        }
    },
    actions: {
        [ACTION_SET_NAME]({commit}, payload){
            commit(SET_NAME, payload)
        },
        [GET_LIST]({commit}, payload){
            commit(SET_LIST, payload)
        },
    }
}

export default home