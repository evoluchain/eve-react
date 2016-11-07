import React from 'react'
import {render} from 'react-dom'

import Eve, {Web3Info} from '../../src'

let Demo = React.createClass({
    render() {
        return <div>
            <h1>eve-react Demo</h1>
            <Eve>
                <Web3Info/>
            </Eve>
        </div>
    }
})

render(<Demo/>, document.querySelector('#demo'))
