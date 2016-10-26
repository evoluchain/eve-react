import React, {Component} from 'react'

import Web3Info_ from './Web3Info'

export const toto = 'TOTO'

export default class Eve extends Component {
  render() {
    return <div>
      <h2>Welcome to Eve React components pack</h2>
    </div>
  }
}

export class Web3Info extends Web3Info_ {
  constructor() {
      super();
    }
}
