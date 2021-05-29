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
import Link from '@material-ui/core/Link';
import EditIcon from '@material-ui/icons/Edit';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Post.module.scss';

const Component = ({className, posts, match}) => {

  // const post = posts.find(p => p.id === match.params.id);
  // console.log('find post', post);

  return (
    <div className={clsx(className, styles.root)}>

      <Grid container spacing={3} className={styles.postContainer}>
        <Grid item xs={12} sm={5} md={6}>
          <img className={styles.postImage} src='https://cdn.pixabay.com/photo/2018/06/12/20/17/football-3471402_1280.jpg' alt='img'></img>
        </Grid>
        <Grid item xs={12} sm={7} md={6} className={styles.content}>
          <div className={styles.titleWrapper}>
            <Typography gutterBottom variant="h5" component="h2" className={styles.title}>
              {/* {post.title} */}
              Ad title 01
            </Typography>
            <div className={styles.postStatus}>Published</div>
            <Link to={`/post/1/edit`} className={styles.postEdit}>
              <Typography className={styles.editContent}>Edit</Typography>
              <EditIcon className={styles.editIcon}/>
            </Link>
          </div>
          <Typography variant="body2" color="textSecondary" component="p" className={styles.postDescription}>
            {/* {post.content} */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </Typography>

          <div className={styles.postContact}>
            <LocalOfferIcon className={styles.contactIcon}/>
            <Typography variant="body2" component="p" className={styles.author}>
              200 $
            </Typography>
          </div>

          <div className={styles.postContact}>
            <MailOutlineIcon className={styles.contactIcon}/>
            <Typography variant="body2" component="p" className={styles.author}>
              john@doe.com
            </Typography>
          </div>

          <div className={styles.postContact}>
            <LocalPhoneIcon className={styles.contactIcon}/>
            <Typography variant="body2" component="p" className={styles.author}>
              909909909
            </Typography>
          </div>

          <div className={styles.postContact}>
            <LocationOnIcon className={styles.contactIcon}/>
            <Typography variant="body2" component="p" className={styles.author}>
              Doe Street 9, London
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
              Publication: 2021.03.04
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Updated: 2021.05.21
            </Typography>
          </div>



        </Grid>
      </Grid>





    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  match: PropTypes.object,
  params: PropTypes.object,
  posts: PropTypes.arrayOf(
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

const mapStateToProps = state => ({
  posts: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
