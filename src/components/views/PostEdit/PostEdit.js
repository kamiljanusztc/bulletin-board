import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

import ImageUploader from 'react-images-upload';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostEdit.module.scss';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={styles.paper}>
          <TextField id="outlined-basic" label="Title" variant="outlined" className={styles.textField}/>
          <TextField
            className={styles.textField}
            id="outlined-textarea"
            label="Description"
            placeholder="Placeholder"
            multiline
            variant="outlined"
            fullWidth
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={styles.paper}>
          <TextField id="outlined-basic" label="E-mail" variant="outlined" className={styles.textField}/>
          <TextField id="outlined-basic" label="Phone" variant="outlined" name="phone" className={styles.textField}/>
          <TextField id="outlined-basic" label="Location" variant="outlined" className={styles.textField} fullWidth/>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <ImageUploader
            withIcon={true}
            buttonText='Choose image'
            // onChange={this.onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            singleImage={true}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={styles.paper}>
          <TextField id="outlined-basic" label="Price" variant="outlined" type="number" className={styles.textField}/>
          <Button
            className={styles.btnSave}
            variant="contained"
            color="primary"
          >
            <SaveIcon className={styles.icon} />
            Save
          </Button>
          <FormControl variant="outlined" className={styles.status}>
            <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
            <Select
              native
              // value={state.age}
              // onChange={handleChange}
              // label="Status"
              // inputProps={{
              //   name: 'Status',
              //   id: 'outlined-status-native-simple',
              // }}
            >
              <option aria-label="None" value="" />
              <option value={10}>Draft</option>
              <option value={20}>Published</option>
              <option value={30}>Finished</option>
            </Select>
          </FormControl>
        </Paper>
      </Grid>
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
  Component as PostEdit,
  // Container as PostEdit,
  Component as PostEditComponent,
};
