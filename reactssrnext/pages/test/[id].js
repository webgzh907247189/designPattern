import Link from "next/link";

export default function ListItem(props) {
  return (
    <div>
        test id : {props.user.name}
    </div>
  );
}

// getInitialProps 用来获取 初始化的数据，
// 该方法 返回的属性对象就是 组件接收的 props
// 该方法返回是一个普通的 js 对象，而不是 Map Set

// 9.03 有三个新方法 替代 getInitialProps  (会在 服务器端 和 客户端都调用，显得比较奇怪)

// getStaticProps(构建的时候获取数据)  getStaicPaths(设置动态路由为了预渲染) getServerSideProps(每次请求都获取数据，在服务端执行)
export const getStaticPaths = async (ctx) => {
  console.log("test.id.getStaicPaths", ctx);

  const paths = [{id: 1},{id: 2}, {id: 3},].map((item) => {
    return `/test/${item.id}`
  })
  // nextjs 不支持  params
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async (ctx) => {
    console.log("test.id.getStaticProps", ctx);
  
    // nextjs 不支持  params
    return {
      props: {
        user: {
            name: 11
        }
      }
    };
};
