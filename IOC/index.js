// https://juejin.im/post/5c2c47dcf265da616d544a53



// bad
{
    // app.js
    import Router from './modules/Router';
    import Track from './modules/Track';

    class App {
        constructor(options) {
            this.options = options;
            this.router = new Router();
            this.track = new Track();

            this.init();
        }

        init() {
            window.addEventListener('DOMContentLoaded', () => {
                this.router.to('home');
                this.track.tracking();
                this.options.onReady();
            });
        }
    }

    // index.js
    import App from 'path/to/App';
    new App({
        onReady() {
            // do something here...
        },
    });
}


//good
{
    // app.js
    import Router from './modules/Router';
    import Track from './modules/Track';

    class App {
        constructor(options) {
            this.options = options;
            this.router = options.router
            this.track = options.track

            this.init();
        }

        init() {
            window.addEventListener('DOMContentLoaded', () => {
                this.router.to('home');
                this.track.tracking();
                this.options.onReady();
            });
        }
    }

    // index.js
    import App from 'path/to/App';
    new App({
        router:  new Router(),
        track: new Track(),
        onReady() {
            // do something here...
        }
    });
}




/**
 *  App 模块此时应该称之为「容器」比较合适了，跟业务已经没有任何关系了，它仅仅只是提供了一些方法来辅助管理注入的依赖和控制模块如何执行。
 * 
 *  控制反转（Inversion of Control）是一种「思想」，依赖注入（Dependency Injection）则是这一思想的一种具体「实现方式」
 *  而这里的 App 则是辅助依赖管理的一个「容器」
 */

//best 
{
    class App {
        static modules = []

        constructor(options) {
            this.options = options;
            // this.router = options.router  ioc中 不需要了
            // this.track = options.track    ioc中 不需要了

            this.init();
        }

        init() {
            window.addEventListener('DOMContentLoaded', () => {
                // this.router.to('home');  在 Router 模块被执行
                // this.track.tracking();   在 Track 模块被执行
                this.initModules();
                
                this.options.onReady();
            });
        }

        static use(module){
            Array.isArray(module) ? module.map( item => App.use(item) ) : App.modules.push(module)
        }
        
        initModules(){
            App.modules.map( item => item.init && typeof(item.init) === 'function' && item.init(this))
        }
    }


    // modules/Router.js
    import Router from 'path/to/Router';
    export default {
        init(app) {
            app.router = new Router(app.options.router);
            app.router.to('home');
        }
    };

    // modules/Track.js
    import Track from 'path/to/Track';
    export default {
        init(app) {
            app.track = new Track(app.options.track);
            app.track.tracking();
        }
    };

    // 额外添加的share模块
    // modules/Share.js
    import Share from 'path/to/Share';
    export default {
        init(app) {
            app.share = new Share();
            app.setShare = data => app.share.setShare(data);
        }
    };


    // index.js
    import App from 'path/to/App';
    import Router from './modules/Router';
    import Track from './modules/Track';

    App.use([Router, Track, Share]);  // App.use 来「注入」依赖

    new App({
        router: {
            mode: 'history',
        },
        track: {
            // ...
        },
        onReady(app) {
            app.setShare({
                title: 'Hello IoC.',
                description: 'description here...',
                // some other data here...
            });
        },
    });
}