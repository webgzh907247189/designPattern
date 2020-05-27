import $ from 'jquery';
import createUnit from './util'
import {createElement} from './element'
import {Component} from './component'

let React = {
    render(element,container){
        let util = createUnit(element)
        let markUp = util.getmarkUp(React.rootIndex)

        $(container).html(markUp)
        $(document).trigger('mounted')
    },
    rootIndex: 0,
    createElement,
    Component
}
export default React