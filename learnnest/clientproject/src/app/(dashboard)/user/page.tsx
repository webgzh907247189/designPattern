'use client'

import { useRouter } from "next/navigation"
export default function User(){
    const router = useRouter()

    return <div onClick={() => { router.push('/admin') }}>User</div>
}

// 给文件夹加上 () 当前文件夹路径就会自动去掉