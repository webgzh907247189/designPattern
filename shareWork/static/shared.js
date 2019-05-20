// var data;
onconnect = function(e) {
  var port = e.ports[0];
  port.onmessage = function(e) {
      console.log(e,'e')
    
    if(e.data=='get'){
        port.postMessage(data);
    }
    // else{
    //     data=e.data;
    // }
  }
}