import React, {useState} from "react";
import "./styles.css";
import Data from "./data"
import Box from "./Box"

function App() {
  const [boxes, setBoxes] = useState(Data)

  function toggle(id) {
    console.log(id)
    const newBoxes = setBoxes((prevState) => {
      return prevState.map((item) => 
        id===item.id ? {...item, on: !item.on} : {...item } 
      )
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
