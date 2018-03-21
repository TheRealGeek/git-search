import React, {Component} from "react";
import {connect} from 'react-redux';
import Header from "../components/Header";

const mapStateToProps = state => {
  return {
    username: state.username,
    userprofile: state.userprofile,
    repos: state.repos
  };
};
const Mine = () => <Header title="Mine" />;

class User extends React.Component {
  onInputChange = event => {
    let { dispatch } = this.props;
    dispatch({ type: "UPDATE_USERNAME", username: event.target.value });
  };

  onUserChange = () => {
    let { dispatch } = this.props;
    let { username } = this.props;
    let { profile } = this.props;
    let { repos } = this.props;
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(xresponse => {
        return xresponse.json();
      })
      .then(xresponse => {
        dispatch({ type: "UPDATE_REPOS", repos: xresponse });
      });
    fetch(`https://api.github.com/users/${username}`)
      .then(xresponse => {
        return xresponse.json();
      })
      .then(xresponse => {
        dispatch({ type: "UPDATE_PROFILE", profile: xresponse });
      });
  };

  render() {
    let { profile } = this.props;
    let { repos } = this.props;
    console.log(repos);
    let repoList = repos.map((repo, i) => {
      return (
        <li key={i} id={repo.id}>
          <a href={repo.html_url} target="_blank">
            {repo.name}
          </a>
          <br />
          {repo.description}
        </li>
      );
    });
    return (
      <div>
        <Header title="Mine" />
        <input
          type="text"
          placeholder="theRealGeek"
          onChange={this.onInputChange}
        />
        <button onClick={this.onUserChange}>
          Show Profile
        </button>
        <hr />
        <h3>
          Stuff about <span>{profile.login}</span> on Github
        </h3>
        <img src={profile.avatar_url} />
        <h4>Repos</h4>
        <ul>{repoList}</ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Mine);

