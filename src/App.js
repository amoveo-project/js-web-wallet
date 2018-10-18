import React, {Component} from 'react'

import VeoNode from './node/index'

import config from './config'

import './App.css'

const defaultConfig = {
  nodeUrl: 'http://amoveo.exan.tech:8080',
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {publicKey: '', error: null, height: 28001}
  }

  componentDidMount = async () => {
    this.node = new VeoNode(config.nodeUrl || defaultConfig.nodeUrl)

    this.node.events.on('header', header => {
      this.setState({height: header[1]})
    })
  }

  loadPubkey = async () => {}

  render() {
    const {publicKey, error, height} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <p>Height: {height}</p>
          <p>
            <label>
              <input type="checkbox" ref="confirm" />
              Confirm pubkey?
            </label>
          </p>
          {error ? (
            <code>{error.toString()}</code>
          ) : (
            <code>Pubkey: {publicKey}</code>
          )}
        </header>
      </div>
    )
  }
}

export default App
