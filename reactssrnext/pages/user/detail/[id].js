import Link from "next/link";
import UserLayout from "../_layout";
import dynamic from "next/dynamic";

const Detail = dynamic(import("./detail"), {
  loading: () => <p>loading...</p>
});

export default function ListItem(props) {
  return (
    <UserLayout>
        <Detail user={props.user}/>
    </UserLayout>
  );
}

// getInitialProps 用来获取 初始化的数据，
// 该方法 返回的属性对象就是 组件接收的 props
// 该方法返回是一个普通的 js 对象，而不是 Map Set

// 9.03 有三个新方法 替代 getInitialProps  (会在 服务器端 和 客户端都调用，显得比较奇怪)

// getStaticProps(构建的时候获取数据)  getStaicPaths(设置动态路由为了预渲染) getServerSideProps(每次请求都获取数据，在服务端执行)
ListItem.getInitialProps = async (ctx) => {
  console.log("List.getInitialProps", ctx);

  // nextjs 不支持  params
  return {
    user: {
        id: ctx.query.id
    }
  };
};
