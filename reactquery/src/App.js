import { useQuery, QueryObserver, useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "./request";
import { useState } from "react";
import { useEffect } from "react";

const useData = () => {
  return useQuery(
    "getUser",
    () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // throw new Error("error");
          resolve([
            {
              id: 1,
              name: "1",
            },
            {
              id: 2,
              name: "2",
            },
            {
              id: 3,
              name: "3",
            },
            {
              id: 4,
              name: "4",
            },
          ]);
        }, 2000);
      });
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,

      // staleTime: Infinity, // Infinity 永不过期，在 5s 内不需要重新获取数据
      // cacheTime: 5000,// 数据在内存中保持多久
      // refetchInterval: 1000, // 1s 刷新一次
    }
  ); // axios.get('/api/user/list')
};

function AppBackup() {
  const usersResult = useData()

  const { data, isLoading, isError } = usersResult;

  if (isLoading) {
    return <div>加载中.....</div>;
  }

  if (isError) {
    return <div>发生了错误.....</div>;
  }
  return <div>一共{data.length}条数据</div>;
}

function AppBackup2() {
  const [data, setData] = useState()
  const queryClient = useQueryClient()
  useEffect(() => {
    const observal = new QueryObserver(queryClient, { queryKey: ['getUser'], refetchOnWindowFocus: false })
    return observal.subscribe((result) => {setData(result.data)})
  }, [])

 
  return <div>一共{data?.length}条数据</div>;
}

function App() {
  const usersResult = useData()

  console.log(usersResult, "usersResultusersResult");

  const { data, isLoading, isError } = usersResult;

  if (isLoading) {
    return <div>加载中.....</div>;
  }

  if (isError) {
    return <div>发生了错误.....</div>;
  }
  return (
    <div className="App">
      ??
      {data?.map?.((item) => {
        return <div key={item.id}>name: {item.name}</div>;
      })}
      <AppBackup/>
      <AppBackup2/>
      <ReactQueryDevtools initialIsOpen={true} />
    </div>
  );
}

export default App;
