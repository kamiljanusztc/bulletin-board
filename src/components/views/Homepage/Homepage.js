import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uniqid from 'uniqid';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getAll, fetchPublished } from '../../../redux/postsRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';

class Component extends React.Component {
  componentDidMount() {
    const { fetchPublishedPosts } = this.props;
    fetchPublishedPosts();
  }

  render() {
    const {className, posts, user} = this.props;

    return (
      <div className={clsx(className, styles.root)}>
        {user.active === true
          ?
          <div>
            <div className={styles.announcement}>
              <h2 className={styles.annoucementTitle}>Would you like to announce something?</h2>

              <Link to={`/post/add`}
                className={styles.addLink}
              >
                <AddCircleOutlineIcon/>
                <p className={styles.addContent}>Add new announcement</p>
              </Link>

            </div>
            <div className={styles.card}>
              {posts.map(post => (
                <Card key={post._id ? post._id : uniqid()}className={styles.cardItem}>
                  <Link to={`/post/${post._id}`} className={styles.cardLink}>
                    <CardActionArea>
                      <CardMedia
                        className={styles.image}
                        image={post.photo}
                        component="img"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {post.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {post.content}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <Button size="small" color="primary">
                      Learn More
                      </Button>
                    </CardActions>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
          :
          <div>
            <div className={styles.announcement}>
              <h2 className={styles.annoucementTitle}>Would you like to announce something?</h2>
              <Button href="https://google.com" className={styles.login}>
                Sign in or create an account
              </Button>
            </div>
          </div>
        }


      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  fetchPublishedPosts: PropTypes.func,
  posts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  statusTrue: PropTypes.bool,
  state: PropTypes.bool,
  user: PropTypes.object,
  // posts: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number,
  //     title: PropTypes.string,
  //     content: PropTypes.string,
  //     datePublication: PropTypes.string,
  //     dateLastUpdate: PropTypes.string,
  //     email: PropTypes.string,
  //     status: PropTypes.string,
  //     image: PropTypes.string,
  //     price: PropTypes.number,
  //     phone: PropTypes.string,
  //     location: PropTypes.string,
  //   })
  // ),
};

const mapStateToProps = state => ({
  posts: getAll(state),
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};

