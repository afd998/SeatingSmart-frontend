import React from 'react'
import EditClass from './EditClass';
import NoEditClass from './NoEditClass';
function EditWrapper(props) {
  const [showEdit, setShowEdit] = React.useState(false);
  console.log(props.classroom);
  return (
    <div>
        {showEdit && <EditClass
          classToEdit={props.classToEdit}
          replaceClass={props.replaceClass}
          setShowEdit={setShowEdit} />}

        {!showEdit && <NoEditClass
          setShowEdit={setShowEdit}
          classToEdit={props.classToEdit}
          replaceClass={props.replaceClass} />}
    </div>
  )
}

export default EditWrapper
