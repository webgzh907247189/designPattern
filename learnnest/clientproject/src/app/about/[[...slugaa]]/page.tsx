type Props = { params: Promise<{ slugaa: string }> }
export default async function About({ params }: Props){
    const {slugaa} = await params;
    // console.log(slugaa, '??', await params)

    return <div>About {slugaa ? slugaa : '----无 slugaa 路径参数'} </div>
}


// [...slug] (包含多个层级的意思) 不会渲染当前文件夹下的路由 ---> (http://localhost:3001/about/ 不会被渲染)
// [[...slug]](包含当前文件夹根目录的意思) 才会渲染 当前文件夹下的路由 ---> (http://localhost:3001/about 才会会被渲染)