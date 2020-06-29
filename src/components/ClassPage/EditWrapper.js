import React from 'react'
import EditClass from './EditClass';
import NoEditClass from './NoEditClass';
function EditWrapper(props) {
  const [showEdit, setShowEdit] = React.useState(false);
  return (
    <div>
      {showEdit && <EditClass
        classToEdit={props.classToEdit}
        setShowEdit={setShowEdit} />}

      {!showEdit && <NoEditClass
        setShowEdit={setShowEdit}
        classToEdit={props.classToEdit}
      />}
    </div>
  )
}

export default EditWrapper
