import React from 'react'
import {render} from 'react-dom'

import Eve, {Web3Info, Account} from '../../src'

let Demo = React.createClass({
    render() {
        return <div>
            <h1>eve-react Demo</h1>
            <Eve>
                <Web3Info/>

                <div>Account</div>
                <Account account="0x1ead39fe991df9efd8c279c13c6f101155640569"/>
            </Eve>
        </div>
    }
})

render(<Demo/>, document.querySelector('#demo'))
