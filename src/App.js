import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { Post } from './components/views/Post/Post';
import { NotFound } from './components/views/NotFound/NotFound';
import {Switcher} from './components/common/Switcher/Switcher';
import { FormPost } from './components/common/FormPost/FormPost';
// import { fetchPublished } from './redux/postsRedux';
// import { connect } from 'react-redux';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  },
});

class App extends React.Component {

  // componentDidMount() {
  //   const { fetchPublishedPosts } = this.props;
  //   fetchPublishedPosts();
  // }

  render() {

    return (
      <Provider store={store}>
        <BrowserRouter>
          <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Switcher />
              <MainLayout>
                <Switch>
                  <Route exact path='/' component={Homepage} />
                  {/* <Route exact path='/post/add' render={() => <FormPost isNewAnnounce={true}/>} /> */}
                  <Route exact path='/post/add' component= {<FormPost isNewAnnounce={true}/>} />
                  <Route exact path='/post/:id' component={Post} />
                  {/* <Route exact path='/post/:id/edit' render={(props) => <FormPost isNewAnnounce={false} id={props.match.params.id} />} /> */}
                  <Route exact path='/post/:id/edit' component= {<FormPost isNewAnnounce={false}/>} />
                  <Route path='*' component={NotFound} />
                </Switch>
              </MainLayout>
            </ThemeProvider>
          </StylesProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}
// const App = () => (

//   <Provider store={store}>
//     <BrowserRouter>
//       <StylesProvider injectFirst>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           <Switcher />
//           <MainLayout>
//             <Switch>
//               <Route exact path='/' component={Homepage} />
//               {/* <Route exact path='/post/add' render={() => <FormPost isNewAnnounce={true}/>} /> */}
//               <Route exact path='/post/add' component= {<FormPost isNewAnnounce={true}/>} />
//               <Route exact path='/post/:id' component={Post} />
//               {/* <Route exact path='/post/:id/edit' render={(props) => <FormPost isNewAnnounce={false} id={props.match.params.id} />} /> */}
//               <Route exact path='/post/:id/edit' component= {<FormPost isNewAnnounce={false}/>} />
//               <Route path='*' component={NotFound} />
//             </Switch>
//           </MainLayout>
//         </ThemeProvider>
//       </StylesProvider>
//     </BrowserRouter>
//   </Provider>
// );

App.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.number,
  fetchPublishedPosts: PropTypes.func,
};


// const mapDispatchToProps = dispatch => ({
//   fetchPublishedPosts: () => dispatch(fetchPublished()),
// });

// const Container = connect(mapDispatchToProps)(Component);

export {
  // Container as App,
  // Component as AppComponent,
};
export { App };
