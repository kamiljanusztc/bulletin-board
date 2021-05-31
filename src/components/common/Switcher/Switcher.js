import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { loadStatusUser } from '../../../redux/userRedux';
import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Switcher.module.scss';

class Component extends React.Component {
  state = {
    user: {
      active: true,
    },
  };

  handleOnChange = (event) => {
    const { userActiveChange } = this.props;
    const {user} = this.state;

    if(event === 'true') {
      user.active = true;
      userActiveChange(user);
    } else {
      user.active = false;
      userActiveChange(user);
    }
  };

  render() {
    const {className} = this.props;

    return(
      <div className={clsx(className, styles.root)}>
        <select
          name="statusUser" id="isLogged"
          onChange={(event) => this.handleOnChange(event.target.value)}>
          <option value="false">Guest</option>
          <option value="true">User</option>
        </select>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  setStatusUser: PropTypes.func,
  user: PropTypes.object,
  userActiveChange: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userActiveChange: (user) => dispatch(loadStatusUser(user)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Switcher,
  Container as Switcher,
  Component as SwitcherComponent,
};
