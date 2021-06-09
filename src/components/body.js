// import React from "react";
import React, { Component } from "react";
import loading from '../img/loading.png';
import sumida from '../img/sumida.jpeg';
import sunshine from '../img/sunshine.jpeg';
// eslint-disable-next-line
import firebase from "firebase/app";
import "firebase/storage";
import'firebase/database';
require('dotenv').config();


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// eslint-disable-next-line
const firebaseConfig = {
    apiKey: process.env.REACT_APP_ApiKey,
    authDomain: process.env.REACT_APP_AuthDomain,
    databaseURL: process.env.REACT_APP_DatabaseURL,
    projectId: "aquarium-news",
    storageBucket: process.env.REACT_APP_StorageBucket,
    messagingSenderId: process.env.REACT_APP_MessagingSenderId,
    appId: process.env.REACT_APP_AppId,
    measurementId: process.env.REACT_APP_MeasurementId
  };

// Firebaseの初期化
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

  class List extends Component {
      state = {};
    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
      this.getFireData();
    }
  
    // Firebaseからのデータ取得
    getFireData() {
      let db = firebase.database();
      let ref = db.ref("news/");
      let self = this;
      ref
        .orderByKey()
        .limitToFirst(10)
        .on("value", snapshot => {
          self.setState({
            data: snapshot.val()
          });
        });
    }
  
    // データ表示の生成
    getTableData() {
      let result = [];
      if (this.state.data === null || this.state.data.length === 0) {
        return [
            <div key="loading" className="loadingWrapper">
                <img src={loading} className="loading" alt="loading" />
                <p>Loading...</p>
            </div>
        ];
      }
      for (let i in this.state.data) {
          if(this.state.data[i].place === "sumida") {
            result.push(
            <div key={i} className="content">
                <div className="image">
                    <img src={sumida} className="thum" alt="thumnail" />
                </div>
                <div className="texts">
                    <p className="date">{this.state.data[i].date}</p>
                    <a href={this.state.data[i].url}>
                        <h2 className="title">{this.state.data[i].title}</h2>
                    </a>
                    <p className="place">すみだ水族館</p>
                </div>
            </div>
            );
          } else if(this.state.data[i].place === "sunshine") {
            result.push(
                <div key={i} className="content">
                    <div className="image">
                        <img src={sunshine} className="thum" alt="thumnail" />
                    </div>
                    <div className="texts">
                        <p className="date">{this.state.data[i].date}</p>
                        <a href={this.state.data[i].url}>
                            <h2 className="title">{this.state.data[i].title}</h2>
                        </a>
                        <p className="place">サンシャイン水族館</p>
                    </div>
                </div>
                );
          }
      }
      return result;
    }
  
    render() {
      if (this.state.data.length === 0) {
        this.getFireData();
      }
      return (
          <div className="contents">{this.getTableData()}</div>
      );
    }
  }
  
  export default List;