import React from 'react'
import {render} from 'react-dom'

import Eve, {toto, Web3Info} from '../../src'

let Demo = React.createClass({
  render() {
    return <div>
      <h1>eve-react Demo</h1>
      <Eve/>{toto}TOTO
      <Web3Info/>
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
