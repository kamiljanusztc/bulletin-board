import React from 'react';
import PropTypes from 'prop-types';
import { NotFound } from '../../views/NotFound/NotFound';
import ImageUploader from 'react-images-upload';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import PublishIcon from '@material-ui/icons/Publish';

import clsx from 'clsx';
import styles from './FormPost.module.scss';

import { connect } from 'react-redux';
import {fetchAddPost, fetchEditPost, getPost, getLoading} from '../../../redux/postsRedux';

import { Formik, Form } from 'formik';
import * as yup from 'yup';


class Component extends React.Component {

  state = {
    post: {
      _id: this.props.isNewAnnounce ? '' : this.props.postById._id,
      title: this.props.isNewAnnounce ? '' : this.props.postById.title,
      text: this.props.isNewAnnounce ? '' : this.props.postById.text,
      price: this.props.isNewAnnounce ? '' : this.props.postById.price,
      photo: this.props.isNewAnnounce ? null : this.props.postById.photo,
      author: this.props.isNewAnnounce ? '' : this.props.postById.author,
      location: this.props.isNewAnnounce ? '' : this.props.postById.location,
      phone: this.props.isNewAnnounce ? '' : this.props.postById.phone,
      status: this.props.isNewAnnounce ? '' : this.props.postById.status,
      created: this.props.isNewAnnounce ? '' : this.props.postById.created,
      updated: this.props.isNewAnnounce ? '' : this.props.postById.updated,
      file: null,
    },
    transition: undefined,
    open: true,
  };


  handleClose = () => {
    this.setState({open: false});
  };


  render() {
    const {className, user, postById, isNewAnnounce, addPost, editPost, loading } = this.props;
    const { post, transition, open } = this.state;

    console.log('loading w formularzu', loading);
    console.log('isNewAnnounce', isNewAnnounce);

    return(
      <div className={clsx(className, styles.root)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {user.active === true
              ?
              <div>
                <Formik
                  initialValues={{
                    _id: post._id,
                    title: post.title,
                    text: post.text,
                    price: post.price,
                    photo: post.photo,
                    author: post.author,
                    location: post.location,
                    phone: post.phone,
                    status: post.status,
                    created: post.created,
                    updated: post.updated,
                    file: post.file,
                  }}
                  onSubmit={values => {
                    if(isNewAnnounce){
                      values.created = new Date().toISOString();
                      values.updated = values.created;
                      const formData = new FormData();
                      for (let key of ['_id','title', 'text', 'price', 'photo', 'author', 'location', 'phone', 'status', 'created', 'updated']) {
                        formData.append(key, values[key]);
                      }
                      formData.append('file', values.file);
                      addPost(formData);
                    } else {
                      values.updated = new Date().toISOString();
                      const formData = new FormData();
                      for (let key of ['_id', 'title', 'text', 'price', 'photo', 'author', 'location', 'phone', 'status', 'created', 'updated']) {
                        formData.append(key, values[key]);
                      }
                      formData.append('file', values.file);
                      editPost(formData);
                    }
                  }}
                  validationSchema={yup.object().shape({
                    title: yup.string().required()
                      .min(10, 'Required min. 10 characters'),
                    text: yup.string().required()
                      .min(20, 'Min. 20 characters')
                      .max(80, 'Required max. 80 characters'),
                    price: yup.number().required('Price should be positive number')
                      .positive()
                      .integer(),
                    author: yup.string().required()
                      .email()
                      .required('Enter valid email'),
                    phone: yup.number()
                      .positive()
                      .integer(),
                    status: yup.string().required(),
                  })}
                >
                  {({ handleChange, setFieldValue, errors, touched, values }) => (
                    <Form>
                      <Grid item xs={12}>
                        <Paper className={styles.paper}>
                          <TextField
                            className={styles.textField}
                            variant="outlined"
                            name="title"
                            id="title"
                            label="Title"
                            value={values.title}
                            onChange={handleChange}
                            error={errors.title && touched.title ? true : false}
                            helperText={errors.title && touched.title ? errors.title : 'Min. 10 characters'}
                          />
                          <TextField
                            className={styles.textField}
                            variant="outlined"
                            name="text"
                            id="text"
                            label="Describe"
                            value={values.text}
                            fullWidth
                            multiline
                            onChange={handleChange}
                            error={errors.text && touched.text ? true : false}
                            helperText={errors.text && touched.text ? errors.text : 'Min. 20 characters'}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper className={styles.paper}>
                          <TextField
                            className={styles.textField}
                            type="email"
                            name="author"
                            id="author"
                            label="Email"
                            value={values.author}
                            variant="outlined"
                            onChange={handleChange}
                            error={errors.author && touched.author ? true : false}
                          />
                          <TextField
                            className={styles.textField}
                            type="number"
                            name="phone"
                            id="phone"
                            label="Phone"
                            value={values.phone}
                            variant="outlined"
                            onChange={handleChange}
                            error={errors.phone && touched.phone ? true : false}
                          />
                          <TextField
                            className={styles.textField}
                            name="location"
                            id="location"
                            label="Location"
                            value={values.location}
                            variant="outlined"
                            onChange={handleChange}
                            error={errors.location && touched.location ? true : false}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper className={styles.imageUploader}>
                          {isNewAnnounce ? null :
                            <Typography variant="body2" gutterBottom align="center">
                              {postById.photo}
                            </Typography>
                          }
                          <ImageUploader
                            name="file"
                            id="file"
                            withIcon={true}
                            buttonText='Choose image'
                            imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                            maxFileSize={5242880}
                            withPreview={true}
                            onChange={event => {
                              setFieldValue('file', event[0]);
                              console.log('event', event[0]);
                            }}
                            singleImage={true}
                            className={styles.file}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper className={styles.paper}>
                          <TextField
                            className={styles.textField}
                            name="price"
                            id="price"
                            label="Price ($)"
                            value={values.price}
                            variant="outlined"
                            type="number"
                            onChange={handleChange}
                            error={errors.price && touched.price ? true : false}
                          />
                          <FormControl variant="outlined" className={styles.formControl}>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              fullWidth
                              name="status"
                              id="name"
                              value={values.status}
                              onChange={handleChange}
                              error={errors.status && touched.status ? true : false}
                            >
                              <MenuItem value="draft">Draft</MenuItem>
                              <MenuItem value="published">Published</MenuItem>
                              <MenuItem value="finished">Finished</MenuItem>
                            </Select>
                          </FormControl>
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
                    </Form>
                  )}
                </Formik>

                {(loading && loading.changePost) &&
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message="Well done! Congratulations!"
                    TransitionComponent={transition}
                    className={styles.snackbarr__success}
                  />
                }
                {(loading && loading.error) &&
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message="Something went wrong"
                    TransitionComponent={transition}
                    className={styles.snackbarr__error}
                  />
                }
              </div>
              :
              <NotFound />
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  isNewAnnounce: PropTypes.bool,
  postById: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  addPost: PropTypes.func,
  editPost: PropTypes.func,
  loading: PropTypes.object,
  match: PropTypes.object,
  params: PropTypes.object,
};

const mapStateToProps = state => ({
  postById: getPost(state),
  user: state.user,
  loading: getLoading(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  addPost: (post) => dispatch(fetchAddPost(post)),
  editPost: (post) => dispatch(fetchEditPost(post, props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as FormPost,
  Container as FormPost,
  Component as FormPostComponent,
};
