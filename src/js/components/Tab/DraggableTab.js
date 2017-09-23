import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { inject, observer } from 'mobx-react'
import Tab from './Tab'
import { DragSource, DropTarget } from 'react-dnd'
import { grey } from 'material-ui/colors'

export const ItemTypes = {
  TAB: 'tab'
}

export const tabSource = {
  beginDrag (props) {
    const {
      dragStore: { dragStart },
      tabStore: { sources: tabs }
    } = props
    dragStart(props)
    return { tabs }
  }
}

export const tabTarget = {
  hover (props, monitor, component) {
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top
    const before = hoverClientY < hoverMiddleY
    const { id, dragStore: { setDropTarget } } = props
    setDropTarget(id, before)
  },
  drop (props, monitor, component) {
    const { dragStore: { drop } } = props
    drop(props)
  }
}

@inject('windowStore')
@inject('tabStore')
@inject('dragStore')
@observer
@DragSource(ItemTypes.TAB, tabSource, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
})
@DropTarget(ItemTypes.TAB, tabTarget, (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
})
export default class DndTab extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired
  }

  componentDidMount () {
    this.props.connectDragPreview(this.props.dragPreview(), {
      captureDraggingState: true
    })
  }

  render () {
    const {
      connectDragSource, connectDropTarget, isOver,
      dragStore: { before }
    } = this.props
    const style = {
      borderBottom: `1px solid ${grey[200]}`,
      borderTop: '1px solid transparent',
      margin: '-1px 0'
    }
    if (isOver) {
      const border = 'border' + (before ? 'Top' : 'Bottom')
      style[border] = '1px black solid'
    }
    return connectDragSource(connectDropTarget(
      <div style={style}>
        <Tab {...this.props} />
      </div>
    ))
  }
}
