{
	let setCommand = function(button,func) {
	    button.onclick = function(){
	        func();
	    }
	};

	let MenuBar = {
	    refersh: function(){
	        alert("刷新菜单界面");
	    }
	};

	let SubMenu = {
	    add: function(){
	        alert("增加菜单");
	    }
	};


	let RefreshMenuBarCommand = function(receiver) {
	    return function(){
	        receiver.refersh();    
	    };
	};

	let AddSubMenuCommand = function(receiver) {
	    return function(){
	        receiver.add();    
	    };
	};

	let refreshMenuBar =  RefreshMenuBarCommand(MenuBar)
	let addSubMenu =  AddSubMenuCommand(SubMenu)

	let b5 = document.getElementById("button5")
    let b6 = document.getElementById("button6")
	setCommand(b5,refreshMenuBar)
	setCommand(b6,addSubMenu)
}

{
	let b1 = document.getElementById("button1"),
    b2 = document.getElementById("button2"),
    b3 = document.getElementById("button3"),
    b4 = document.getElementById("button4");

    let bindEvent = function(btn,fn){
    	btn.onclick = function(){
    		fn()
    	}
    }

    let Todo1 = {
	    test1: function(){
	        alert("我是来做第一个测试的");
	    }    
	};
	let Menu = {
	    add: function(){
	        alert("我是来处理一些增加操作的");
	    },
	    del: function(){
	        alert("我是来处理一些删除操作的");
	    },
	    update: function(){
	        alert("我是来处理一些更新操作的");
	    }
	};

	bindEvent(b1,Todo1.test1)
	bindEvent(b2,Menu.add)
	bindEvent(b3,Menu.del)
	bindEvent(b4,Menu.update)
}



/**
 * 理解宏命令
 */
{
	let command1 = {
	    execute: function(){
	        console.log(1);
	    }
	};

	let command2 = {
	    execute: function(){
	        console.log(2);
	    }
	};

	let command3 = {
	    execute: function(){
	        console.log(3);
	    }
	};

	function command(){
		return {
			objList: [],
			add(command){
				this.objList = [...this.objList,command]
			},
			execute(){
				for(let item of this.objList){
					item.execute()
				}
			}
		}
	}

	let fnObj = command()
	fnObj.add(command1)
	fnObj.add(command2)
	fnObj.add(command3)

	fnObj.execute()
}



