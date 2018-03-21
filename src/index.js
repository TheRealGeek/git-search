import React from 'react';
import Redux from 'redux';
import {render} from 'react-dom';
import './index.css';
// import App from './screens/Search.js';
import registerServiceWorker from './registerServiceWorker';
//import { render } from "react-dom"; //not used in the bundle
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home, Mine, Search } from "./screens";
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux'
import reducer from './reducers/reducer.js';
import Header from './components/Header.js'
import { createSelector } from 'reselect';

const mapStateToProps = state => {
  return {
    username: state.username,
    userprofile: state.userprofile,
    repos: state.repos
  };
};
const store = createStore(reducer);
const Index = ({ store }) => (

    <Router>
      <div className= 'wrap'>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/mine" component={Mine} />
      </div>
    </Router>

);


connect(mapStateToProps)(Index);

// ReactDOM.
render(
  <Provider store={store}>
    {/* <App /> */}
    <div>
      <Index />
    </div>
  </Provider>,
  document.getElementById("root")
);
//registerServiceWorker();

// const Index = ({ pathname }) => {
//   switch (pathname) {
//     case "/search":
//       return <Search />;
//     case "/mine":
//       return <Mine />;
//     default:
//       return <Home />;
//   }
// };

// const route = (WrappedComponent, routes) => {
//   return class extends React.Component {
//     render() {
//       const ComponentForPathname = routes[this.props.pathname];
//       return (
//         <WrappedComponent>
//           <ComponentForPathname {...this.props} />
//         </WrappedComponent>
//       );
//     }
//   };
// };

// const Root = props => <div>{props.children}</div>;

// const Router = route(Root, {
//   "/": Home,
//   "/search": Search,
//   "/mine": Mine
// });

// let pathname = window.location.pathname;

// // render(<Index pathname={pathname} />, document.getElementById("root"));
// render(<Index store={createStore(reducer)} />, document.getElementById("root"));

// window.addEventListener("popstate", () => {
//   pathname = window.location.pathname;
// });

