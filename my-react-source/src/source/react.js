import {createUnit} from './unit';
import {createElement} from './element';
import $ from 'jquery';

const React = {
    render,
    RootIndex: 0,
    createElement,
    Component: class Component{
        constructor(props){
            this.props = props;
        }
    }
}

function render(element,container) {
    const unit = createUnit(element)
    const markUp = unit.getMarkUp(React.RootIndex);
    $(container).html(markUp);
    $(document).trigger('mounted');
}

export default React;

