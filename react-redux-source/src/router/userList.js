import React from "react";
import { Link } from 'react-router-dom'

export default class UserList extends React.Component {
  render() {
    let list = JSON.parse(localStorage.getItem("userList")) ?? [];
    return (
      <ul>
        {list.map((item, idx) => {
          return <li key={item.id}><Link to={ {pathname: `/user/detail/${item.id}`, state: item}}>{item.userName}</Link></li>;
        })}
      </ul>
    );
  }
}
