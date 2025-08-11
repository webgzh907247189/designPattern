export default function logger(createState){
    return (set, get, api) => {
        return createState((...args) => {
            console.log('prevState', get())
            set(...args)
            console.log('nextState', get())
        }, get, api)
    }
}