import React from 'react';
import PropTypes from 'prop-types';
import { NotFound } from '../NotFound/NotFound';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import ImageUploader from 'react-images-upload';

import { connect } from 'react-redux';
import {getAll, fetchAddPost} from '../../../redux/postsRedux';

import styles from './PostAdd.module.scss';


class Component extends React.Component {

  state = {
    post: {
      title: '',
      text: '',
      price: '',
      photo: null,
      author: '',
      location: '',
      phone: '',
      status: '',
      created: '',
      updated: '',
    },
  };

  handleChange = (event) => {
    const { post } = this.state;

    this.setState({ post: { ...post, [event.target.name]: event.target.value } });
  };

  handleChangePrice = (event) => {
    const { post } = this.state;

    this.setState({ post: { ...post, [event.target.name]: parseInt(event.target.value) } });
  };

  handleImage = (files) => {
    const { post } = this.state;

    if (files !== undefined) this.setState({ post: { ...post, photo: files[0].name } });
  }

  submitForm = (event) => {

    const { post } = this.state;
    const { addPost } = this.props;
    event.preventDefault();

    if(post.title.length < 10) return alert('Min. 10 characters in title');
    if(post.text.length < 20) return alert('Min. 20 characters in text');
    if(post.price <= 0) return alert('Wrong price');
    const authorPattern = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+.{1,3}[a-zA-Z]{2,4}');
    const authorMatched = post.author.match(authorPattern);
    const authorMatchedJoined = (authorMatched || []).join('');
    if(authorMatchedJoined.length < post.author.length) return alert('Wrong format email');

    if((post.title.length > 9) && (post.text.length > 19) && (post.author.length === authorMatchedJoined.length)) {
      post.created = new Date().toISOString();
      post.updated = post.created;

      addPost(post);

      this.setState({
        post: {
          title: '',
          text: '',
          price: '',
          photo: '',
          author: '',
          location: '',
          phone: '',
          status: '',
          created: '',
          updated: '',
        },
      });

      alert('Your post was added.');
    }
  };

  render() {
    const {className, user } = this.props;
    const { post } = this.state;

    return(
      <div className={clsx(className, styles.root)}>
        {user.active === true
          ?
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={styles.paper}>
                <TextField id="outlined-basic" label="Email" variant="outlined" className={styles.textField} required onChange={this.handleChange}/>
                <TextField id="outlined-basic" label="Phone" variant="outlined" name="phone" className={styles.textField} required onChange={this.handleChange}/>
                <TextField id="outlined-basic" label="Location" variant="outlined" className={styles.textField} fullWidth required onChange={this.handleChange}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={styles.imageUploader}>
                <ImageUploader
                  withIcon={true}
                  buttonText='Choose image'
                  onChange={this.handleImage}
                  imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                  singleImage={true}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={styles.paper}>
                <TextField id="outlined-basic" label="Price" variant="outlined" type="number" className={styles.textField} onChange={this.handleChangePrice}/>
                <Button
                  type="submit"
                  className={styles.btnSave}
                  variant="contained"
                  color="primary"
                >
                  <PublishIcon className={styles.icon} />
                  Publish
                </Button>
                <FormControl required fullWidth variant="outlined" className={styles.formControl}>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select labelId="demo-simple-select-label" fullWidth name="status" value={post.status} onChange={this.handleChange}>
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                    <MenuItem value="finished">Finished</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
          :
          <NotFound/>
        }
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
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
  addPost: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  postsAll: getAll(state),
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  addPost: (post) => dispatch(fetchAddPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
