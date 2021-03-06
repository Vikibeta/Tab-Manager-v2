import React from 'react'
import FlipMove from 'react-flip-move'
import Title from './Title'
import DraggableTab from 'components/Tab/DraggableTab'

export default class Window extends React.Component {
  getBoundingClientRect = () => {
    if (this.node) {
      return this.node.getBoundingClientRect()
    }
  }

  render () {
    const { win: { tabs }, getWindowList, dragPreview, width } = this.props
    const content = tabs.map(tab => (
      <DraggableTab key={tab.id}
        tab={tab}
        {...{ getWindowList, dragPreview }}
      />
    ))
    return (
      <div ref={(el) => { this.node = el || this.node }}
        style={{ width }}>
        <Title {...this.props} />
        <FlipMove duration={256}
          easing='ease-in-out'
          appearAnimation='accordionHorizontal'
          enterAnimation='accordionHorizontal'
          leaveAnimation='accordionHorizontal'
        >
          {content}
        </FlipMove>
      </div>
    )
  }
}
