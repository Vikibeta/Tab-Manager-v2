import React from 'react'
import { inject, observer } from 'mobx-react'
import { grey } from 'material-ui/colors'
import { dropTargetColor } from 'libs'
import SelectAll from './SelectAll'
import Sort from './Sort'

const borderBottom = `1px solid ${grey[200]}`

@inject('dragStore')
@observer
export default class Title extends React.Component {
  onDragOver = (e) => {
    e.nativeEvent.preventDefault()
    const { win: { id }, dragStore: { setTargetWinId } } = this.props
    setTargetWinId(id)
  }

  onDrop = () => {
    this.props.dragStore.dropToNewWindow()
  }

  render () {
    const {
      win: { id, tabs },
      dragStore: { targetWinId }
    } = this.props
    const { length } = tabs
    const { onDragOver, onDrop } = this
    const style = {
      borderBottom,
      display: 'flex',
      paddingLeft: '0.5rem',
      paddingRight: 4,
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      lineHeight: '2.5rem'
    }
    const isOver = id === targetWinId
    const text = isOver ? 'New Window' : `${length} tab${length > 1 ? 's' : ''}`
    const title = (
      <span style={{
        flex: '1 1 auto',
        width: 'max-content'
      }}>
        {text}
      </span>
    )
    if (isOver) {
      style.backgroundColor = dropTargetColor
    }
    return (
      <div style={style} {...{ onDragOver, onDrop }}>
        {title}
        <SelectAll {...this.props} />
        <Sort {...this.props} />
      </div>
    )
  }
}
