import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Feed } from 'components'
import * as feedActionCreators from 'redux/modules/feed'
import { duckFanout } from 'redux/modules/ducks'
import { formatDuck } from 'helpers/utils'

class FeedContainer extends Component {
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  }

  handleduckFanout = ({text}) => {
    this.props.duckFanout(
      formatDuck(text, this.props.user))
  }

  render () {
    const {duckIds, isFetching, newDucksAvailable, resetNewDucksAvailable} = this.props
    return (
      <Feed
        duckIds={duckIds}
        isFetching={isFetching}
        newDucksAvailable={newDucksAvailable}
        resetNewDucksAvailable={resetNewDucksAvailable}
        handleduckFanout={this.handleduckFanout}/>
    )
  }
}

FeedContainer.propTypes = {
  user: PropTypes.object.isRequired,
  duckIds: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  duckFanout: PropTypes.func.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
  setAndHandleFeedListener: PropTypes.func.isRequired,
}

function mapStateToProps ({ feed, authentication }) {
  const { newDucksAvailable, isFetching, duckIds } = feed
  return {
    newDucksAvailable,
    isFetching,
    duckIds,
    user: authentication.loggedIn ? authentication.user : {},
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({...feedActionCreators, duckFanout}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer)
