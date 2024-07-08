import { useState } from 'react'
import { connect } from "react-redux";
import { SET_USER_INFO } from "../../../store/types";

const Detail = (props) => {
  const [time, setTime] = useState('')
    const btnClick = async () => {
      const {default: moment} = await import('moment')
      console.log(moment)
      const now = moment().format('YYYY-MM-DD HH:mm:ss')

      setTime(now)
    }


  const setUserInfo = () => {
    props.dispatch({type: SET_USER_INFO, payload: { name: 'gzh' }})
  }
 

    return  <div onClick={() => btnClick()}>
    <div>点击我： ID： {props.user.id} -- {time}</div>
    <div onClick={() => setUserInfo()}>点击我， 触发 disatch user--user --{props?.currentUser?.name}</div>;
  </div>
}

export default connect((state) => state)(Detail);