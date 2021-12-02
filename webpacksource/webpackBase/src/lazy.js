let app = document.getElementById('app');

app.addEventListener('click',() => {
    import('./aa').then((data) => {
        console.log(data, '???????');
    })
})