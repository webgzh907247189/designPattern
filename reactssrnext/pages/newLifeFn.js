import React from "react";
import router from 'next/router'
import Link from "next/link";
export default function newLifeFn(props) {
  return <div>
    <style jsx>{`
      .jump {
        color: green;
      }
    `}</style>
    <div>props: {props.name} </div>
    {
      props.list.map(item => {
          return <div key={item.id}><Link  className="jump" href={`/test/${item.id}`}>{item.id}</Link></div>
      })
    }

  </div>;
}

export const getServerSideProps = async (ctx) => {
  console.log('newLifeFn.getServerSideProps')
  return {
    props: {
      name: 'newLifeFn',
      list: [{id:1}, {id:2}, {id: 3}]
    }
  }
}
