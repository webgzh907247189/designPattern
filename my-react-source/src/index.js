import React from './source/react';
import ReactDOM from 'react-dom';
import App from './App';

// React.render('111', document.getElementById('root'));

// let ele = (
// <button id="btn" style={{color: 'red',backgroundColor: 'yellow'}} className="btn">
//     test
//     <b>
//         test11
//     </b>
// </button>);

function btnClick() {
    console.log('btnClick~~~btnClick')
}
const ele = React.createElement('button',{id: 'btn', className: 'btn', style: {color: 'red',backgroundColor: 'yellow'}, onClick: btnClick},'test',React.createElement('b',{},'tets11'));
React.render(ele, document.getElementById('root'));

