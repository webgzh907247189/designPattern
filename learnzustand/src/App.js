
import useStore from './store'
import { useShallow } from "zustand/react/shallow";
function App(props) {
  console.log('App render')
  // const { number, asyncNumber, name, add, asyncAdd } = useStore()

  // 因为 name 经过了 selector 的过滤，所以不展示了
  const { number, name, add } = useStore(useShallow((state) => {
    return {
      number: state.number,
      name: state.name,
      add: state.add,
    }
  }))
  return (
    <div className="App">
      <header className="App-header">
        <div>{number} --* number *</div>
        <div>{name} -- * name *</div>
        {props.children}
        <button onClick={add}>add</button>
      </header>
    </div>
  );
}

export default App;

export const APP1 = () => {
  console.log('APP111 render')
  // const state1 = (state) => {
  //   return {
  //     asyncNumber: state.asyncNumber,
  //     asyncAdd: state.asyncAdd
  //   }
  // }
  // const state2 = useShallow(state1)
  // const { asyncNumber, asyncAdd} = useStore(state2)
  
  const asyncNumber = useStore(state => state.asyncNumber)
  const asyncAdd = useStore(state => state.asyncAdd)

  return <>
   <div>{asyncNumber} -- * asyncNumber *</div>
   <button onClick={asyncAdd}>asyncAdd</button>
  </>
}

/**
 * 1. 通过 create 创建 数据仓库
 */