import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd-mobile';

const alert = Modal.alert;
let isShow = null
let isShowAlert = null;

function desAlert(target,name,descriptor) {
	let fn = descriptor.value
	descriptor.value = function(...args){
		console.log(isShowAlert,'isShowAlert  使用decoration进行限制')
		return isShowAlert = isShowAlert || fn.apply(this,args)
	}
	return descriptor
}	

class App extends Component {
	constructor(props){
		super(props)
	}

	showAlert = () => {
		console.log(isShow,'isShow单列的弹窗   没有使用decoration')
		isShow = isShow || this.alertNoDescriptor()
	}

	alertNoDescriptor() {
		let alertInstance = null
		setTimeout(()=>{
			alertInstance = alert('Delete', 'Are you sure???Are you sure???', [
				{ text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
				{ text: 'OK', onPress: () => console.log('ok') }
			]);
			isShow = false
		},1000)
		return true
	}

	@desAlert
	alert() {
		let alertInstance = null
		setTimeout(()=>{
			alertInstance = alert('Delete', 'Are you sure???Are you sure???', [
				{ text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
				{ text: 'OK', onPress: () => console.log('ok') }
			]);
			isShowAlert = false
		},1000)
		return true
	}

	render() {
		return (
			<div>
		        <Button onClick={this.alert}>使用decoration进行限制</Button>
		        <Button onClick={this.showAlert}>一般情况下的限制</Button>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));