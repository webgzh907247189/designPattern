const fs = require('fs')
const path = require('path')
const puppteer = require('puppeteer')
const {sleep} = require('./utils')

module.exports = class Skeleton{
    constructor(options){
        this.options = options
    }

    async initialize(){
        this.broswer = await puppteer.launch({headless: false})
    }

    async newPage(){
        let { device } = this.options
        const page = await this.broswer.newPage()
        // console.log(puppteer.KnownDevices['iPhone 6'], 'puppteer.devicespuppteer.devices')
        await page.emulate(puppteer.KnownDevices[device])
        return page
    }

    async genHTML(url){
        let { rootNodeContainer } = this.options
        // console.log(rootNodeContainer, 'rootNodeContainerrootNodeContainerrootNodeContainer')
       let page = await this.newPage()
       let res = await page.goto(url, { waitUntil: 'networkidle2' })
       if(res && !res.ok()){
        throw new Error('访问失败')
       }

       await this.makeSkeleton(page)

       const {styles, html} = await page.evaluate(({rootNodeContainer}) => {
			return window.SkeletonSdk.genHtmlAndStyle(rootNodeContainer)
       }, {rootNodeContainer})

	   const result = `
	   	<style>${styles.join('\n')}</style>
		${html}
	   `
       return result
    }

    async makeSkeleton(page){
        const { defer = 10000 } = this.options
        let scriptContent = await fs.readFileSync(path.join(__dirname, 'skeletonSrcipt.js'), 'utf8')
      
        await page.addScriptTag({ content: scriptContent })
        await sleep(defer)
        // console.log(this.options, 'this.optionsthis.options')
        await page.evaluate((options) => {
            return window.SkeletonSdk.genSkeleton(options)
        }, this.options)
    }
    async destroy(){
        if(this.broswer){
            await this.broswer.close()
            this.broswer = null
        }
    }
}



// const memoizedSelectCompletedTodos = createSelector(
//     [(state) => state.todos],
//     todos => {
//       console.log('memoized selector ran')
//       return todos.filter(todo => todo.completed === true)
//     }
//   )
  
//   memoizedSelectCompletedTodos(state) // memoized selector ran
//   memoizedSelectCompletedTodos(state)
//   memoizedSelectCompletedTodos(state)