import Link from "next/link";
import { Provider } from "react-redux";
import createStore from "../store/index";
import route from 'next/router'


// let store = createStore({});

// _app.js  ->  App 组件是每个页面的根组件，页面切换时 App 不会销毁， 但是里面的页面组件会销毁，因此可以利用这个来设置全局样式 和 属性

// 模块化css
import _appModule from "./_app.module.css";

// 全局样式
import "../styles/global.css";
import { useState, useEffect } from "react";

// _app.js  ->  App 组件是每个页面的根组件，页面切换时 App 不会销毁， 但是里面的页面组件会销毁，因此可以利用这个来设置全局样式 和 属性


function getStore(initState){
  // 服务端数据， 每个客户端过来 都创建一个 新的 store
  if(typeof window === "undefined"){
    return createStore(initState);
  }else{
    // 客户端渲染
    // window.__REDUX_STORE__ = createStore(initState);
    // return window.__REDUX_STORE__

    // 使用window 属性判断，只有一个 __REDUX_STORE__
    if(!window.__REDUX_STORE__){
      window.__REDUX_STORE__ = createStore(initState);
    }
    return window.__REDUX_STORE__
  }
}

export default function MyApp({ Component, pageProps, initState }) {
  // 不同的客户端访问的是 一个服务器地址，创建各自的仓库，客户端取服务端的数据作为初始化数据，再次创建新的 store
  const store = getStore(initState);
  
  const [loading, setLoading] = useState(false)
  const changeLoadingTrue = () => {
    setLoading(true)
  }
  const changeLoadingFalse = () => {
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }

  useEffect(() => {
   route.events.on('routeChangeStart',changeLoadingTrue)
   route.events.on('routeChangeComplete',changeLoadingFalse)
   return  () => {
       route.events.off('routeChangeStart',changeLoadingTrue)
       route.events.off('routeChangeComplete',changeLoadingFalse)
     }
  }, [route])

  return (
    <Provider className="111" store={store}>
      <style jsx>{`
        .linka {
          color: red;
        }
        .linkgroup {
          display: flex;
          justify-content: space-around;
        }
      `}</style>

      _app

      <div className="linkgroup">
        <Link legacyBehavior href="/user/list" className="linka">
          <a>User</a>
        </Link>
        <Link legacyBehavior href="/" className="linka">
          <a>Index</a>
        </Link>
        <Link legacyBehavior href="/profile" className="linka">
          <a className={_appModule.linkHref}>Profile</a>
        </Link>
        <Link legacyBehavior href="/newLifeFn" className="linka">
          <a className={_appModule.linkHref}>newLifeFn</a>
        </Link>
      </div>

        {
          loading ? <span>加载中，请稍等....</span> :  <Component {...pageProps} />
        }
    </Provider>
  );
}

// 9.03 有三个新方法 替代 getInitialProps  (会在 服务器端 和 客户端都调用，显得比较奇怪)
// 该方法返回是一个普通的 js 对象，而不是 Map Set

// getStaticProps(构建的时候获取数据)  getStaicPaths(设置动态路由为了预渲染) getServerSideProps(每次请求都获取数据，在服务端执行)

MyApp.getInitialProps = async ({ Component, ctx }) => {
  // 马上创建于一个新的 store，没有传参数，走的 reducer 的默认参数
  // 不同的客户端访问的是 一个服务器地址，创建各自的仓库，客户端取服务端的数据作为初始化数据，再次创建新的 store
  let store = getStore()

  // 默认页面的属性对象
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // 默认状态
  // 不同的客户端访问的是 一个服务器地址，创建各自的仓库，客户端取服务端的数据作为初始化数据，再次创建新的 store
  let initState = store.getState();


  // 返回的这个对象 会 成为当前组件的属性对象
  return {
    pageProps,
    initState
  };
};