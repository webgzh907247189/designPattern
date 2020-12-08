import { MOUNTED, UNMOUNTING, NOT_MOUNTED } from "../applications/app.helpers";

// 卸载 app 操作
export async function toUnmountPromise(app){
    // 如果当前 应用没有挂载，不需要做任何事情
    if (app.status !== MOUNTED) {
        return app
    }

    app.status = UNMOUNTING
    await app.unmount(app.customProps)
    app.status = NOT_MOUNTED
    return app;
}   