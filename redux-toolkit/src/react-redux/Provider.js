import ReactContext from './reactContext'

export default function Provider(props) {
  return (
    <ReactContext.Provider value={{ store: props.store}}>
      {props.children}
    </ReactContext.Provider>
  )
}