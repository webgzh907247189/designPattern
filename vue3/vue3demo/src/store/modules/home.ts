import { Module } from 'vuex';
import { GlobalState } from '../index';

type iList = { url: string };

export type HomeState = {
    name: string,
    list: iList[],
}

const state: HomeState = {
    name: '?home?',
    list: [{url: '11'}]
}

export const SET_NAME = 'set_name';
export const ACTION_SET_NAME = 'action_set_name';

const home: Module<HomeState, GlobalState> = {
    namespaced: true,
    state,
    mutations: {
        [SET_NAME](state, payload: string){
            state.name = payload;
        }
    },
    actions: {
        [ACTION_SET_NAME]({commit}, payload){
            commit(SET_NAME, payload)
        }
    }
}

export default home