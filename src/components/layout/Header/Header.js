import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({className, user}) => (
  <div className={clsx(className, styles.root)}>
    <AppBar className = {styles.appBar} position="static">
      <Toolbar className = {styles.menu}>
        <Link to={'/'} className={styles.home}>
          <FontAwesomeIcon icon={faDiceD20} className={styles.logo}/>
           B B O A R D
        </Link>
        {user.active === true
          ?
          <div>
            <Link className={styles.announcements} to={`/`}>
            Announcements
            </Link>
            <Link color="inherit" to={`/`} className={styles.login}>
              <IconButton
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              Logout
            </Link>
          </div>
          :
          <Button color="inherit" href="https://google.com" className={styles.login}>
            <IconButton
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            Login
          </Button>
        }
      </Toolbar>
    </AppBar>

  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  setIsLogged: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.user,
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
