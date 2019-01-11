/**
 *   https://www.cnblogs.com/qinmengjiao123-123/p/5603057.html
 **/
function composeFn(...args){
    return args.reverse().reduce((result,fn)=>{
        return (...relayArgs)=>{
            return fn.call(null,result.apply(null,relayArgs))
        }
    },args.shift())
}



function getDataURL(canvas){
  return canvas.toDataURL()
}

function dataURLtoBlob(dataurl) {
  let [type,content] = dataurl.split(',')
  let mime = type.match(/:(.*?);/)[1]

  let bstr = atob(content)
  let length = bstr.length
  let u8arr = new Uint8Array(length)
  while (length--) {
      u8arr[length] = bstr.charCodeAt(length);
  }
  return new Blob([u8arr], { type: mime });
}

function getBlob(blob){
  return window.URL.createObjectURL(blob)
}

function getDownImg(url){
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute('download','code.jpeg');
  document.body.appendChild(link);
  link.click();
}

let composeResult = composeFn(getDownImg,getBlob,dataURLtoBlob,getDataURL)
let composeResultQrCode = composeFn(getDownImg,getBlob,dataURLtoBlob)


{	
	let src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAYAEgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD353WNGd2CqoyWJwAPWvJ9L+LV7rfxZsPDtjaWo0K7SRo7l1YzShEkO8fNhVLJwCuSvPcV13xD0PXvEXhc6XoFzZwSzTKLn7W7okkGDuTKAsMnaDjHGea8e1KDxta/HHw1btF4Zi1uPTSlkkAnFmsIWcYYffyBvxjj7vvQB7p4k8U6N4R06O/1y8+yWskohV/KeTLkEgYQE9FP5VU07x94W1bW7jR7HWrea+twxkjAYDC/ewxG1sd8E1wX7R3/ACTzT/8AsKx/+ipai1i2gsv2mfCFvawpDCmkMqpGuAAEuQBj6AflQB1HxA8dXPhvRItW0KXS9QjgmX7bbs++Qwk4LJtYYI9weue1R3fxMgutf0Ww8Pob2K6hN5duttJI6w4+RUVcfOx4yeFAJNbuqazBqa3Wj2Ft/aLOrQ3O1d8SAjDKxyATgngsBwec8HzP9nrS/tPg7Urvz2hL35hkMS7ZHVY0IUv1CjecBcHJPNAHos/iux08ve6xdXNsIomlFqlrNhEA5Zzsy3fnhR7kZrkrHx38QfFsR1Hwp4a06HSGYiCXU3ffMAcbhtIA6e/1NdJ8RfDs9/8ADTW9M0O2/wBLmjVwifflKurMCerMVUjnk5rzVvitFpfwosdD0E3Vl4stIYbX7K1kzOpTAd8MpU5APB5+bpQB7T4fu9XvNKifXNMWw1AZEsccqyRk5OCpBJxgA84xnHNFWdJF2NGsRfyGS8+zx+e5UKWk2jccAADnPAAooAuUUUUANdxHGzkMQoJIVST+AHJrO+z3Wqc3ga2tD0tlb55B/wBNGHQf7I/EnJFFFAF+CCG1gSC3ijhhQYWONQqqPYDpUlFFABRRRQAUUUUAf//Z'
	composeResultQrCode(src)	
}


{
	html2canvas(document.getElementById('root'),{
		height: '440',
        width: '550',
		onrendered: function(canvas) {
	        composeResult(canvas)
	    }
	})
}