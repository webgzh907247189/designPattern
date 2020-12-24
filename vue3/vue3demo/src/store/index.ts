import { createStore } from 'vuex'
import home, { HomeState } from './modules/home';

export interface GlobalState {
    home:  HomeState,
}
const store = createStore<GlobalState>({
  // state: {
  // },
  mutations: {
  },
  actions: {
  },
  modules: {
    home
  }
})

// store.state.home.name
export default store