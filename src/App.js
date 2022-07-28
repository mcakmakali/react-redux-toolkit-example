import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { PostsList } from './features/posts/PostsList';
import { Navbar } from './app/Navbar'
import { AddPostForm } from './features/posts/AddPostForm';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { EditPostForm } from './features/posts/EditPostForm';



function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostForm/>
                <PostsList/>
              </React.Fragment>
            )}
          />
          <Route exact path='/post/:postId' component={SinglePostPage}/>
          <Route exact path="/editPost/:postId" component={EditPostForm} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
