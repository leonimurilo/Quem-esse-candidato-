import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import ReduxThunk from 'redux-thunk';
import {BrowserRouter, Route, Switch} from "react-router-dom";
// import {Link} from "react-router-dom";

import ChatBox from "./components/ChatBox";

import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                {/*<header>*/}
                    {/*<div id="nav">*/}
                        {/*<h3></h3>*/}
                    {/*</div>*/}
                {/*</header>*/}
                {/*<Switch>*/}
                    {/*<Route path="/" component={ChatBox}/>*/}
                {/*</Switch>*/}
                <h3>Hello</h3>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector("#app")
);
