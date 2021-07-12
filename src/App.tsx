import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Nav from './components/Nav'

import views from './views'

import NotFound from './views/NotFound'

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        { views.map(view => (
          <Route exact={view.exact} path={view.to} key={view.to}>
            <view.component />
          </Route>
        )) }
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App
