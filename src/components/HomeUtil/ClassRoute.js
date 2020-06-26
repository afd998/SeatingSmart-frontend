import React from 'react'
import { useParams } from "react-router-dom";
import FourOFour from '../../util/FourOFour';
import ClassPage from '../ClassPage/ClassPage';
export default function ClassRoute(props) {
  let classroom;
  let { URLclassName } = useParams();
  const { allClasses } = props;
  if (allClasses === 'init') {
    return <div>loading </div>;
  } else {
    let found = false;
    allClasses.forEach(element => {
      if (element.className === URLclassName) {
        classroom = element;
        found = true;
      }
    });
    if (!found) {
      return <FourOFour />;
    } else {
      return (
        <div>
         <ClassPage classroom = {classroom} replaceClass ={props.replaceClass}/>
        </div>
      )
    }
  }





}
