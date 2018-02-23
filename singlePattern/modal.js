import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd-mobile';

const alert = Modal.alert;
let isShow = null

class App extends Component {
	constructor(props){
		super(props)
	}

	showAlert = () => {
		isShow = isShow || this.alert()
	}

	alert() {
		let  alertInstance = null
		setTimeout(()=>{
			alertInstance = alert('Delete', 'Are you sure???Are you sure???', [
				{ text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
				{ text: 'OK', onPress: () => console.log('ok') }
			]);
			isShow = false
		},1000)
		return true
	}

	render() {
		return (
			<div>
		        <Button onClick={this.showAlert}>customized buttons</Button>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));