// 假设我们提前从后台获取到所有颜色手机的库存量
var goods = {
    // 手机库存
    "red|32G": 6,
    "red|64G": 16,
    "blue|32G": 8,
    "blue|64G": 18
};

/*
我们下面分别来监听colorSelect的下拉框的onchange事件和numberInput输入框的oninput的事件，
然后在这两个事件中作出相应的处理
*/
var colorSelect = document.getElementById("colorSelect"),
    memorySelect = document.getElementById("memorySelect"),
    numberInput = document.getElementById("numberInput"),
    colorInfo = document.getElementById("colorInfo"),
    numberInfo = document.getElementById("numberInfo"),
    memoryInfo = document.getElementById("memoryInfo"),
    nextBtn = document.getElementById("nextBtn");
        
// 监听change事件
colorSelect.onchange = function(e){
    select();
};
numberInput.oninput = function(){
    select();
};
memorySelect.onchange = function(){
    select();    
};
function select(){
    var color = colorSelect.value,   // 颜色
        number = numberInput.value,  // 数量
        memory = memorySelect.value, // 内存
        stock = goods[color +'|'+memory];  // 该颜色手机对应的当前库存
            
    colorInfo.innerHTML = color;
    numberInfo.innerHTML = number;
    memoryInfo.innerHTML = memory;
    // 如果用户没有选择颜色的话，禁用按钮
    if(!color) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = "请选择手机颜色";
        return;
    }
    // 如果用户没有选择内存，禁用按钮
    if(!memory){
        nextBtn.disabled = true;
        nextBtn.innerHTML = "请选择手机内存";
        return;
    }
    // 判断用户输入的购买数量是否是正整数
    var reg = /^\d+$/g;
    if(!reg.test(number)) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = "请输入正确的购买数量";
        return;
    }
    // 如果当前选择的数量大于当前的库存的数量的话，显示库存不足
    if(number > stock) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = "库存不足";
        return;
    }
    nextBtn.disabled = false;
    nextBtn.innerHTML = "放入购物车";
}