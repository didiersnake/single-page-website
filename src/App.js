import React, {useState} from "react";
import "./styles.css";
import Data from "./data"
import Box from "./Box"

function App() {
  const [boxes, setBoxes] = useState(Data)
  // id here is passed from box compoenent as toggle(props.id)
  function toggle(id) {
    
    const newBoxes = setBoxes((prevState) => {
      // map through current array 
      return prevState.map((item) =>
        //if currentItem.id = id, refactor object else return object
        id === item.id ? { ...item, on: !item.on } : { ...item }
      );
    })

    return newBoxes
  }

  const square = boxes.map((item) =>
    <Box id={item.id} on={item.on} key={item.id} toggle={toggle} />
  )

  return (
    <div>
      {square}
    </div>
  );
}

export default App;
