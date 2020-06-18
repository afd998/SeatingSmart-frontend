import React from 'react'
import { useParams } from "react-router-dom";
import FourOFour from '../../util/FourOFour';
import ClassPage from './ClassPage';
export default function ClassRoute(props) {
  let classroom;
  let { URLclassName } = useParams();
  const { allClasses } = props;

  let markUp
  if (allClasses === 'init') {
    return <div>loading </div>;
  } else {
    let found = false;
    console.log("allClasses", allClasses);
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
