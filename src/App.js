import React, { useState } from "react";
import { storage } from "./Firebase/Firebase";
import "./App.css";
import styled from "styled-components";
import firebase from "firebase";

const Upbutton = styled.button`
  background-color: red;
  height: 100px;
  width: 500px;
`;

const Form = styled.form`
  background-color: green;
  height: 1000px;
  width: 1000px;
`;

const Wrapper = styled.div`
  display:flex; 
  height 100vh;
  width: 100%;
  justify-content: center;
  align-items: center; 
  background-color: whitesmoke; 
  flex-direction: column; 
`;

const App = () => {
  const firebaseApp = firebase.apps[0];
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const handleFireBaseUpload = e => {
    e.preventDefault()
  console.log('start of upload')
  // async magic goes here...
  if(imageAsFile === '') {
    console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
  }
  const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
  //initiates the firebase side uploading 
  uploadTask.on('state_changed', 
  (snapShot) => {
    //takes a snap shot of the process as it is happening
    console.log(snapShot)
  }, (err) => {
    //catches the errors
    console.log(err)
  }, () => {
    // gets the functions from storage refences the image storage in firebase by the children
    // gets the download url then sets the image from firebase as the value for the imgUrl key:
    storage.ref('images').child(imageAsFile.name).getDownloadURL()
     .then(fireBaseUrl => {
       setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
     })
  })
  }

  return (
    <Wrapper>
      <div className="App">
        //form for handling file upload
        <form onSubmit={handleFireBaseUpload}>
          <input
            // allows you to reach into your file directory and upload image to the browser
            type="file"
            onChange={handleImageAsFile}
          />
           <button>upload to firebase</button>
        </form>
      </div>
    </Wrapper>
  );
};

export default App;
