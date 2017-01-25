import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import Eve, {Web3Info, Web3Eth, web3} from 'src/'

const coinbase = web3.eth.coinbase

describe('Eve', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it.skip('displays a welcome message', () => {
    render(<Eve/>, node, () => {
      expect(node.innerHTML).toContain('Welcome to Eve React components pack')
    })
  })

  it('Web3Eth coinbase', () => {
    render(
        <Web3Eth method='coinbase'>{({error, result}) => {return <span>HERE TOTO{result}</span>}}</Web3Eth>
        , node, () => {
          console.log('coinbase', coinbase)
          console.log(node)
      expect(node.innerHTML).toContain('HERE')
    })
  })

})
