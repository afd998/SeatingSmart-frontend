import React from 'react'
import {Chip} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';

function Student() {
  return (
    <div>
      <Chip variant="outlined" size="small" icon={<FaceIcon />} />
    </div>
  )
}

export default Student
