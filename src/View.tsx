import * as React from 'react';
import { parse } from 'query-string';
import { render } from 'react-dom';
import QRCode from "qrcode.react"
import ReactDOM from 'react-dom';

class View extends React.Component {
  urls: string;
  from: string;
  to: string;
  title: string;
  bodys: string;
  interval: NodeJS.Timer | null;

  constructor(props: any) {
    super(props);
    this.from = "";
    this.to = "";
    this.title = "";
    this.bodys = "";
    this.interval = null;
  }

  private clearReload() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = null;
  }

  private autoReload() {
    this.interval = setInterval(() => {
      const url = 'https://localhost:28080/read'
      const p = parse(window.location.search);
      const obj = { token: p.token };
      const method = "POST";
      const body = JSON.stringify(obj);
      const headers = {
        'Content-Type': 'application/json',
      };
      fetch(url, {method, headers, body})
        .then((res)=> res.json())
        .then(result => {
          if (result.from != "") {
            ReactDOM.render(
              <div>
                <p>from:</p>
                <h3>{result.from}</h3>
                <p>to:</p>
                <h3>{result.to}</h3>
                <p>title:</p>
                <h3>{result.title}</h3>
                <p>body:</p>
                <h3>{result.bodys}</h3>
                <p>file:</p>
                <h3><a href={result.file} >DOWNLOAD</a></h3>
              </div>, document.getElementById('root'));
            this.clearReload()
          } else {
            console.log("no read flag")
          }
      });
    }, 10000);
  }

  render() {
    this.autoReload()
    const p = parse(window.location.search);
    const urls = process.env.REACT_APP_QR_API + "auth=" + p.token;
    console.log("QR: " + urls)
    return (
      <div>
        <QRCode
          value={urls}
          size={150}
          level={"H"}
          includeMargin={true}
        />
        <br />
        <p>from:</p>
        <p>to:</p>
        <p>title:</p>
        <p>body:</p>
        <p>file:</p>
      </div>
    );
  }
}

export default View;
