import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css"
import { store } from "./app/store";
import { Provider } from "react-redux";
import { fetchPosts } from "./features/post/postSlice";
import { fetchUsers } from "./features/users/userSlice";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//load data before rendering components 
store.dispatch(fetchUsers())
store.dispatch(fetchPosts())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App /> } />
        </Routes>
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

