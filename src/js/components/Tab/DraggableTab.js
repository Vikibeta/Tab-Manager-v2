import React from 'react'
import { inject, observer } from 'mobx-react'
import { grey, red } from 'material-ui/colors'
import Tab from './Tab'

const getBackground = (before) => `
  linear-gradient(to ${before ? 'bottom' : 'top'}, ${red[500]}, white, white, white)
`

@inject('dragStore')
@observer
export default class DraggableTab extends React.Component {
  onDragStart = (e) => {
    const { dragPreview, tab, dragStore: { dragStart } } = this.props
    dragStart(tab)
    e.dataTransfer.setDragImage(dragPreview(), 0, 0)
  }

  onDragEnd = () => {
    this.props.dragStore.dragEnd()
  }

  onDragOver = (e) => {
    e.nativeEvent.preventDefault()
    const { tab: { id }, dragStore: { setDropTarget } } = this.props
    const { offsetY } = e.nativeEvent
    const { clientHeight } = this.node
    const before = offsetY < clientHeight / 2
    setDropTarget(id, before)
  }

  onDragLeave = () => {
    const { dragStore: { setDropTarget } } = this.props
    setDropTarget(null)
  }

  onDrop = () => {
    const { dragStore: { drop } } = this.props
    drop(this.props.tab)
  }

  render () {
    const { tab: { id }, dragStore: { before, targetId } } = this.props
    const style = {
      borderBottom: `1px solid ${grey[200]}`
    }
    if (targetId === id) {
      style.background = getBackground(before)
    }
    const { onDragStart, onDragLeave, onDragEnd, onDragOver, onDrop } = this
    return (
      <div
        draggable
        style={{
          ...style,
          ...this.props.style
        }}
        ref={(el) => { this.node = el || this.node }}
        {...{ onDragStart, onDragLeave, onDragEnd, onDragOver, onDrop }}
      >
        <Tab {...this.props} />
      </div>
    )
  }
}
