let app = document.getElementById('app');
import P from 'test111'

app.addEventListener('click',() => {
    import('./aa').then((data) => {
        data = P
        console.log(data.run(), '???????');
    })
})