import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SoundPlayerContainer from './soundPlayerContainer'
import Player from './player'

import * as listenActions from 'src/core/listen'

class Listen extends Component {

  static propTypes = {
    isPlayerLoaded: PropTypes.bool.isRequired,
    loadPlayerData: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { isPlayerLoaded, loadPlayerData } = this.props
    if (!isPlayerLoaded) {
      loadPlayerData()
    }
  }

  render() {
    const { isPlayerLoaded } = this.props
    if (!isPlayerLoaded) {
      return <div></div>
    }

    const r = Math.floor(Math.random() * 6)

    return (
      <div className={`listen-container background-${r}`}>
        <SoundPlayerContainer>
          <Player />
        </SoundPlayerContainer>
      </div>
    )
  }
}

export default connect(state => ({
  isPlayerLoaded: state.listen.isLoaded,
}), listenActions)(Listen)
