import React, { useState } from "react";
import ReactDOM from "react-dom";


const Input = ({ data }) => (
  <input value={`${data}`} />
);

const Upload = () => {
  async function readitem(e, func) {
    const file = e.target.files[0];
    const reader = new FileReader();
    //console.log(file);
    reader.onload = function(e) {
      let binaryData = e.target.result;
      let base64String = window.btoa(binaryData);
      func(base64String);
    };

    let item = reader.readAsBinaryString(file);
    //console.log(reader);

    return item;
  }

  const [item, setItem] = useState("");

  return (
    <form>
      <input
        name="upload-item"
        type="file"
        accept="item/*"
        onChange={event => {
          readitem(event, setItem);
        }}
      />
      {item ? <Input data={item.Name} /> : <p>Please Upload item</p>}
    </form>
  );
};

export default Upload;
