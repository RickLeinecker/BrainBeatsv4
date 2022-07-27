import React, {useState} from "react";

const Random = () => {
    const [test, setTest] = useState('')
  return (
    <>
        <button onClick={() => console.log(test)}>BUTTON</button>
        <Random2 test={test} setTest={setTest}/>
    </>
  );
};

const Random2 = ({test, setTest}) => {
    return(
        <>
        <input onChange={(e) =>setTest(e.target.value)} />
        </>
    )
}

export default Random;
