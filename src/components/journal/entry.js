/* eslint-disable react/no-multi-comp */
import React, { PropTypes } from 'react'
import classnames from 'classnames'

import { TRACK_UNLOCKED } from 'src/core/journal/types'
import { Icon } from '../shared'

import EntryContent from './entryContent'

const Entry = (props) => {
  const { entry, showBorder } = props

  const iconType = getIconType(entry.type)

  const outerClasses = classnames({
    'journal-entry': true,
    'bottom-border': showBorder,
  })

  return (
    <div className={outerClasses}>
      <div className="journal-entry-icon">
        <Icon type={iconType} size={50} />
      </div>
      <EntryContent entry={entry} />
    </div>
  )
}

function getIconType(type) {
  const iconTypeMap = {
    [TRACK_UNLOCKED]: 'unlock',
  }
  return iconTypeMap[type] || ''
}

Entry.propTypes = {
  entry: PropTypes.object.isRequired,
}

export default Entry