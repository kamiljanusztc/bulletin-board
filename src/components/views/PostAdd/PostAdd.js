import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';

import ImageUploader from 'react-images-upload';

import { connect } from 'react-redux';
import { getAll, getOnePost } from '../../../redux/postsRedux';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';

const Component = ({className, post}) => (
  <div className={clsx(className, styles.root)}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={styles.paper}>
          <TextField
            variant="outlined"
            className={styles.textField}
            required
            id="outlined-basic"
            label="Title"
            inputProps={{ minLength: 10, maxLength: 40 }}
          />
          <TextField
            className={styles.textField}
            id="outlined-textarea"
            label="Description"
            placeholder="Placeholder"
            multiline
            variant="outlined"
            fullWidth
            inputProps={{ minLength: 20, maxLength: 500 }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={styles.paper}>
          <TextField id="outlined-basic" label="Email" variant="outlined" className={styles.textField} required/>
          <TextField id="outlined-basic" label="Phone" variant="outlined" name="phone" className={styles.textField} required/>
          <TextField id="outlined-basic" label="Location" variant="outlined" className={styles.textField} fullWidth required/>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={styles.imageUploader}>
          <ImageUploader
            withIcon={true}
            buttonText='Choose image'
            // onChange={this.onDrop}
            imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            singleImage={true}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={styles.paper}>
          <TextField id="outlined-basic" label="Price" variant="outlined" type="number" className={styles.textField} required/>
          <Button
            type="submit"
            className={styles.btnSave}
            variant="contained"
            color="primary"
          >
            <PublishIcon className={styles.icon} />
            Publish
          </Button>
        </Paper>
      </Grid>
    </Grid>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  addPost: PropTypes.func,
  post: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
      datePublication: PropTypes.string,
      dateLastUpdate: PropTypes.string,
      email: PropTypes.string,
      status: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number,
      phone: PropTypes.string,
      location: PropTypes.string,
    })
  ),
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const mapStateToProps = (state, props) => ({
//   posts: getAll(state),
//   post: getOnePost(state, props.match.params.id),
// });

// const mapDispatchToProps = dispatch => ({
//   addPost: (post) => dispatch(addPost(post)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostAdd,
  // Container as PostAdd,
  Component as PostAddComponent,
};
