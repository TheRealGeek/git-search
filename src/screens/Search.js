// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { saveRepos } from "../actions/AppActions";

// class Search extends React.Component {
//   state = {
//     search: ""
//   };

//   searchGithub = () => {
//     fetch("https://api.github.com/search/repositories?q=" + this.state.search)
//       .then(resp => resp.json())
//       .then(respJson => {
//         this.props.dispatch(saveRepos(respJson.items));
//       });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.searchGithub();
//   };
//   render() {
//     return (
//       <div className="container">
//         <Header title="Search" />
//         <hr />
//         <form onSubmit={this.handleSubmit}>
//           <input
//             type="text"
//             placeholder="search"
//             value={this.state.search}
//             onChange={search => {
//               this.setState({ search: search.target.value });
//             }}
//           />
//           <input type="submit" value="submit" />
//         </form>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     repos: state.repos
//   };
// };

// export default connect(mapStateToProps)(Search);

import Header from "../components/Header";
import React, { Component } from "react";
import { connect } from "react-redux";
//import logo from "../logo.svg";
import "../App.css";
import { BrowserRouter } from 'react-router-dom'

const mapStateToProps = state => {
  return {
    username: state.username,
    userprofile: state.userprofile,
    repos: state.repos
  };
};


class Searcher extends Component {
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
    return <div className="container">
        <Header title='Search'></Header>
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



export default connect(mapStateToProps)(Searcher);
//how to target a component within a component to clear a VDOM tag --- how to make sure it clears automatically.
//use the router that uses redux in lesson 7 to display sheets