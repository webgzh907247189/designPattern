import { useState, useRef } from 'react';
// https://blog.fundebug.com/2021/06/28/typescript-the-difference-between-interface-and-type/
// https://github.com/Fundebug/fundebug-blog/issues/249

function App() {
    const imgRef = useRef();
    const canvasRef = useRef();
    const [state, setState] = useState({ file: '', dataUrl: '' })

    const handleChange = (event) => {
        let file = event.target.files[0]
        console.log(event.target.files[0]);
    
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            setState({
                file, 
                dataUrl: e.target.result
            })

            imgRef.current.onload = function(){
                drawImg();
            }
        }
        fileReader.readAsDataURL(file)
    }

    const drawImg = () => {
        let image = imgRef.current;
        let canvas = canvasRef.current;
        console.log(canvas, 'imgRef');
        let ctx = canvas.getContext('2d')
        console.log(ctx, 'ctx');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let imageWidth = image.width;
        let imageHeight = image.height;
        ctx.drawImage(image, 0, 0, imageWidth, imageHeight)
    }
  return (
    <div className="App">
        <input type="file" accept="image/*" onChange={handleChange}/>
        {state.file && (<img src={state.dataUrl} ref={imgRef}  alt="" style={{ border: '2px dashed green', width: '200px'}}/>)}

        {state.file && (<div style={{ position: 'relative', width: '300px'}}>
            <canvas ref={canvasRef} width="300px" height="300px" style={{border: '2px dashed blue'}}></canvas>
            <div style={{width: 100, height: 100,background: 'yellow', opacity: .3, position: 'absolute', top: '50%', left:'50%'}}></div>
        </div>)}
    </div>
  );
}

export default App;
