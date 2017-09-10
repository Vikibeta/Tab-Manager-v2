import React from 'react'
import { inject, observer } from 'mobx-react'
import Snackbar from 'material-ui/Snackbar'
import Fade from 'material-ui/transitions/Fade'

@inject('shortcutStore')
@observer
class Shortcut extends React.Component {
  render () {
    const {
      shortcutStore: { combo, toastOpen }
    } = this.props
    return (
      <Snackbar
        style={{
          left: 'unset',
          right: 0,
          margin: 'auto'
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        SnackbarContentProps={{
          style: {
            padding: '0 2rem',
            justifyContent: 'center',
            textTransform: 'capitalize',
            background: 'rgba(0, 0, 0, 0.25)'
          }
        }}
        transition={Fade}
        open={toastOpen}
        message={combo}
      />
    )
  }
}

export default Shortcut