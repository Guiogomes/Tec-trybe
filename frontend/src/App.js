import { useContext } from "react";
import { Route } from "react-router-dom";
import Agenda from "./Components/Agenda";
import Form from "./Components/Form";
import Headers from "./Components/Headers";
import FillAgenda from "./Components/HiddenForm";
import { MyContext } from "./context/Provider";

function App() {
  const { hidden } = useContext(MyContext);
  return (
    <div>
      <Headers/>
      {hidden ? <FillAgenda/> : <Form/>}      
      <Agenda/>
    </div>
  );
}

export default App;
