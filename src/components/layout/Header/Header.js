import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import Link from '@material-ui/core/Link';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <AppBar className = {styles.appBar} position="static">
      <Toolbar className = {styles.menu}>
        <Link href={`/`} className = {styles.home}>
          <FontAwesomeIcon icon={faDiceD20} className={styles.logo}/>
           B B O A R D
        </Link>
        <Link className={styles.announcements} href={`/`}>
          Announcements
        </Link>
        <select
        // value={this.state.value} onChange={this.handleChange}
        >
          <option value="Guest">Guest</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <Link color="inherit" href="https://google.com" className={styles.login}>
          <IconButton
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          Login
        </Link>
      </Toolbar>
    </AppBar>

    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
