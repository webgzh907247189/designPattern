import { Container } from '.'
let container = new Container()

const point = { x: 10, y: 10 }

class BasicClass{}

// container.addProvider({ useClass: BasicClass, provide: BasicClass })

container.addProvider({ useValue: new BasicClass, provide: BasicClass })

// container.addProvider({ useFactory: () => BasicClass, provide: BasicClass })

// console.log(container)

let r = container.inject(BasicClass)
console.log(r)