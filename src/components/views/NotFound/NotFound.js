import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './NotFound.module.scss';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <Grid item xs={12}>
      <div className={styles.paper}>
        <ErrorOutlineIcon className={styles.icon}/>
        <h1 className={styles.title}>Page not found</h1>
      </div>
      <Link className={styles.link} to={`/`}>
        <ArrowBackIcon className={styles.arrow}/>
        <Typography className={styles.linkTitle}>Homepage</Typography>
      </Link>
    </Grid>


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
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
