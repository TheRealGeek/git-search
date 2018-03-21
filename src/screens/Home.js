import React,{Component}from "react";
import Header from "../components/Header";
import {connect} from 'react-redux';
const Home = () => (
    <div className="Container">
        <Header title="Home" />
        <p>This is my home page. Click search. DO IT.</p>
    </div>
);

export default Home;

