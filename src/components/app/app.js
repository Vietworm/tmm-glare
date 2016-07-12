import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Notifications from '../notifications/notifications'

import Sidebar from 'react-sidebar'
import Header from './header'
import Menu from './menu'

import Loading from '../loaders/loading'

import { addNotification } from 'src/core/notifications'
import { toggleSidebar } from 'src/core/app'

export class App extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    addNotification: PropTypes.func,
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    user: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
  }

  componentWillReceiveProps(nextProps) {
    const { router } = this.context
    const { auth } = this.props

    if (auth.authenticated && !nextProps.auth.authenticated) {
      router.replace('/sign-in')
    } else if (!auth.authenticated && nextProps.auth.authenticated) {
      router.replace('/connect')
    }
  }

  onSetSidebarOpen = (open) => {
    this.props.toggleSidebar(open)
  }

  renderLoading = () => {
    return (
      <main className="main">
        <Loading />
      </main>
    )
  }

  renderMain = () => {
    const { children } = this.props
    return (
      <main className="main">
        {children}
        <Notifications />
      </main>
    )
  }

  render() {
    const { isLoading, isSidebarOpen, user } = this.props
    const sidebarStyles = {
      zIndex: 100,
    }

    const fixedWindowStyle = {
      height: `${window.innerHeight}px - 44px`,
      width: `${window.innerWidth}px`,
    }

    return (
        <div className="container" style={fixedWindowStyle}>
        <Sidebar
          sidebar={<Menu />}
          open={isSidebarOpen}
          sidebarClassName="sidebar-container"
          styles={{ sidebar: sidebarStyles }}
          shadow={false}
          pullRight={true}
          onSetOpen={this.onSetSidebarOpen}>
            { user ? <Header /> : null }
            {isLoading ? this.renderLoading() : this.renderMain()}
          </Sidebar>
        </div>
    )
  }
}

export default connect(state => ({
  auth: state.auth,
  isLoading: state.loading,
  isSidebarOpen: state.app.isSidebarOpen,
  user: state.user,
}), {
  addNotification,
  toggleSidebar,
})(App)
