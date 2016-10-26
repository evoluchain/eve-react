import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import Eve, {Web3Info} from 'src/'

describe('Eve', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays a welcome message', () => {
    render(<Eve/>, node, () => {
      expect(node.innerHTML).toContain('Welcome to Eve React components pack')
    })
  })
})
