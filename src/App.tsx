import React, { useState } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import QRCode from "qrcode.react"

function App() {
  let file: HTMLInputElement;
  let name: string;

  const [values, setValues] = useState({
    api: "https://localhost:28080/",
    from: "",
    to: "",
    title: "test",
    bodys: "testmail!"
  });

  function handleInputChange(e: any) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  }

  function fileInputChange(e: any) {
    file = e.target.files[0]
    name = e.target.files[0].name
  }

  function onFormSubmit(e: any) {
    e.preventDefault()
    if (values.from.length > 0 && values.to.length > 0 && values.title.length > 0 && values.bodys.length > 0 && file != null)  {
      fileUpload(file, name).then((response: any)=>{
        console.log(response.data)
        const fileUrl = values.api + "download?token=" + response.data + "&name=" + name
        const obj = {From: values.from, To: values.to, Title: values.title, Bodys: values.bodys, File: fileUrl, Flag: "0"};
        const method = "POST";
        const body = JSON.stringify(obj);
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        console.log(body)
        fetch(values.api + 'send', {method, headers, body}).then((res)=> res.json()).then(console.log).catch(console.error);
      })
    } else {
      alert("either mail forms is empty!")
    }
  }

  function fileUpload(file: any,name: any) {
    const url = values.api + 'upload';
    const formData = new FormData();
    formData.append('name',name)
    formData.append('file',file)
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
    }
    return axios.post(url, formData,config)
  }

  return (
    <div>
      <h2>Mail Form</h2>
      <form onSubmit={onFormSubmit}>
        API Server: <input type="text" name="api" defaultValue={values.api} onChange={handleInputChange} /><br />
        <br />
        from: <input type="text" name="from" defaultValue={values.from} onChange={handleInputChange} /><br />
        to: <input type="text" name="to" defaultValue={values.to} onChange={handleInputChange} /><br />
        title: <input type="text" name="title" defaultValue={values.title} onChange={handleInputChange} /><br />
        body: <input type="text" name="bodys" defaultValue={values.bodys} onChange={handleInputChange} /><br />
        <input type="file" onChange={fileInputChange} /><br /><br />
        <button type="submit">Send</button>
      </form>
    </div>
   )
}

export default App
