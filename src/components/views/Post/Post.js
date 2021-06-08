import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Grid from '@material-ui/core/Grid';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

import { connect } from 'react-redux';
import { getPost, fetchPost } from '../../../redux/postsRedux';

import styles from './Post.module.scss';

class Component extends React.Component {

  componentDidMount() {
    const { fetchOnePost } = this.props;
    fetchOnePost();
  }

  render() {
    const {className, postById, user} = this.props;

    return (
      <div className={clsx(className, styles.root)}>
        <Grid container spacing={3} className={styles.postContainer}>
          <Grid item xs={12} sm={5} md={6}>
            <img className={styles.postImage}
              src={postById.photo}
              alt="img"/>
          </Grid>
          <Grid item xs={12} sm={7} md={6} className={styles.text}>
            <div className={styles.titleWrapper}>
              <Typography gutterBottom variant="h5" component="h2" className={styles.title}>
                {postById.title}
              </Typography>
              <div className={styles.postStatusWrapper}>
                <Typography className={styles.postStatus}>
                  {postById.status}
                </Typography>
              </div>
            </div>
            <Typography variant="body2" color="textSecondary" component="p" className={styles.postDescription}>
              {postById.content}
            </Typography>

            <div className={styles.postContact}>
              <LocalOfferIcon className={styles.contactIcon}/>
              <Typography variant="body2" component="p" className={styles.author}>
                {postById.price}
              </Typography>
            </div>

            <div className={styles.postContact}>
              <MailOutlineIcon className={styles.contactIcon}/>
              <Typography variant="body2" component="p" className={styles.author}>
                {postById.email}
              </Typography>
            </div>

            <div className={styles.postContact}>
              <LocalPhoneIcon className={styles.contactIcon}/>
              <Typography variant="body2" component="p" className={styles.author}>
                {postById.phone}
              </Typography>
            </div>

            <div className={styles.postContact}>
              <LocationOnIcon className={styles.contactIcon}/>
              <Typography variant="body2" component="p" className={styles.author}>
                {postById.location}
              </Typography>
            </div>

            <div className={styles.icons}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </div>

            <div className={styles.date}>
              <Typography variant="body2" color="textSecondary" component="p">
              Publication: {postById.datePublication}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              Updated: {postById.dateLastUpdate}
              </Typography>
            </div>
            {user.active === true
              ?
              <Link to={`/post/${postById._id}/edit`} className={styles.postEdit}>
                <Typography className={styles.editContent}>Edit</Typography>
                <EditIcon className={styles.editIcon}/>
              </Link>
              :
              null
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object,
  match: PropTypes.object,
  params: PropTypes.object,
  postById: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  fetchOnePost: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  postById: getPost(state),
  user: state.user,
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchOnePost: () => dispatch(fetchPost(props.match.params.id)),

});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
