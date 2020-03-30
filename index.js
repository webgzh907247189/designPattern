面试：
1. webWorker 使用 -> self.close() 或者 worker.terminate()
2. compose 使用 fns.reduce(a,b) => (..args) => a(b(..args)))
5. 切片上传 -> 秒传，暂停上传，恢复上传，切片上传，hash计算
6. abortCOntroller 取消 
3. 小数的使用  `${Math.round(`${parseFloat(val)}e${num}`)}e-${num}` * 1 round() 方法可把一个数字舍入为最接近的整数
8. vue 不更新， v-if 修改key 使其强制渲染
9. vue 数据问题，使用$set
10. http1 最多6个tcp连接  http2 最多20个tcp连接
11. Object.keys() | values()  排序问题
12. 解决问题的能力，善于思考，去发现问题，解决痛点
13. 业务场景，一个已经选中的selectList由id组成，一个数据源，需要根据 selectList 的 item 去数据源找出每一项name
常规做法，遍历数据源根据id去匹配，如何做的更好呢？(因为数据源很大，所以才用缓存，koa的query 得到的启发)
==== 
每次使用之前，去map里面找一次看有没有
selectedMap.get(selectedList) === categoryData，有的话，直接返回selectedMap.get(selectedList.toString())
没有的话，先计算nameList后面selectedMap.set(selectedList, categoryData);selectedMap.set(selectedList.toString(), list);

14. window.URL.createObjectURL(blob);  window.URL.revokeObjectURL(url); 释放数据
15. 下载图片(跨域的不跨域的，使用canvas，使用fetch的 res.blob())

16. fetch相关操作，进度，取消，流？？？？
17. 同步版本好号使用流去操作 ？？？？
18. 怎么看帧数 看回流 重绘 ？？？？


3. 缓存的课程复习 + 资料
4. 动态加载问题 ？？？掘金 静态分割 动态分割 参考cms项目id查询模块
6. chunkname ？？？request
5. webpack。环境变量设置 ？？掘金
7. webwork thunk 问题？？？
8. 批量引入的问题
9. public，private 缓存
10. tree组件
11. node问题
