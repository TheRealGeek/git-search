import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  onHandleChange = e => {
    let { dispatch } = this.props;
    dispatch({ type: "UPDATE_USERNAME", username: e.target.value });
  };

  onUserSearch = () => {
    let { dispatch } = this.props;
    let { username } = this.props;
    // let { repos_url } = ''; //added this to clear the repos list on new search
    fetch(`https://api.github.com/users/${username}`) // single or double quotes will work here, but because there is string interpolation (adding variable input into a string) back ticks (`) must be used.
      .then(res => {
        //the "res" part can literally be whatever, so long as it is used consistently within the function. In this case, "res" is short for "response", which is what this function is doing.
        return res.json();
      })
      .then(res => {
        // console.log(res); //this works, but all it does is log the response of both functions to the console, showing the information provided by the github search API request
        dispatch({ type: "UPDATE_USERPROFILE", userprofile: res });
      })

      // .then(res => {  //added this function to clear the repos list on a new search *DOESN'T WORK*
      //   dispatch({type:'UPDATE_REPOS', repos_url});
      // })
  };

  onRepoFetch = () => {
    let { dispatch } = this.props;
    let { repos_url } = this.props.userprofile;

    fetch(repos_url)
      .then(res => {
        return res.json();
      })
      .then(res => {
        dispatch({ type: "UPDATE_REPOS", repos: res });
      });
  };

  render() {
    let { userprofile } = this.props;
    let repos = this.props.repos.map((repo, i) => {
      return <li key={i}>{repo.name}</li>;
    });
    return <div>
        <h1>{this.props.username}</h1>
        <input type="text" onChange={this.onHandleChange} value={this.props.user} />
        <button onClick={this.onUserSearch}>Search</button>
        <hr />
        <h3>{userprofile.login}</h3>
        <img src={userprofile.avatar_url} alt="" />
        <button onClick={this.onRepoFetch}>Fetch Repos</button>
        <ul>{repos}</ul>
      </div>;
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    userprofile: state.userprofile,
    repos: state.repos
  };
};

// export default connect(mapStateToProps)(App);
//how to target a component within a component to clear a VDOM tag --- how to make sure it clears automatically.
//use the router that uses redux in lesson 7 to display sheets