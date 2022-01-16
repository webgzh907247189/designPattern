export class Cancel{
    public msg: string
    constructor(msg: string){
        this.msg = msg
    }
}


export class CancelToken{
    public resolve: any
    source(){
        return {
            token: new Promise((resolve) => {
                this.resolve = resolve
            }),
            cancel: (msg: string) => {
                this.resolve(new Cancel(msg))
            }
        }
    }
}

export function isCancel(err) {
    return err instanceof Cancel
}