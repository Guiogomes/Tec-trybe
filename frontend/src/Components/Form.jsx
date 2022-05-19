import React, { useContext } from 'react';
import { MyContext } from '../context/Provider';
import EditedForm from './EditedForm';
import RegularForm from './RegularForm';


const Form = () => {
  const { isEdited } = useContext(MyContext);

  return(
    <div>
      {isEdited ? <EditedForm/> : <RegularForm/>}
    </div>
  )
};

export default Form;