import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Button from '../common/Button/Button';
import { bookmarkArticle } from '../../actions/bookmarks';

export class BookmarkArticle extends Component {
  state = { bookmarkClicked: false, bookmarks: '' };

  handleClick = () => {
    const {
      article: { slug },
      bookmarkArticle,
      isAuth
    } = this.props;
    if (isAuth) {
      bookmarkArticle({ slug });
      this.setState({ isAuth: true, bookmarkClicked: true });
    } else {
      this.setState({ isAuth: false, bookmarkClicked: true });
    }
  };

  componentWillReceiveProps(nextProps) {
    const {
      bookmarks: { bookmarks },
      article: { slug }
    } = nextProps;
    if (bookmarks && !bookmarks.userId) {
      this.setState({
        bookmarks,
        slug
      });
    } else {
      this.setState({
        bookmarks: 'Article bookmarked successfully',
        slug
      });
    }
  }

  render() {
    const { isAuth, bookmarkClicked, bookmarks, slug } = this.state;

    return (
      <div className="row inline-block medium-padding">
        <span className="" />
        <Button
          id="bookmarkArticle"
          buttonClass="button border b-light-grey medium-padding light inline-block radius-1"
          onClick={this.handleClick}
        >
          Bookmark {''}
          <FontAwesomeIcon icon={faBookmark} />
        </Button>
        {!isAuth && bookmarkClicked ? (
          <p className="text-danger" style={{ position: 'absolute' }}>
            <Button buttonClass="button medium-padding primary radius-1">
              <Link to={`/login?redirect=articles/${slug}`}>Login</Link>
            </Button>
            to perform this action
          </p>
        ) : (
          ''
        )}
        {isAuth && bookmarkClicked ? (
          <p className="text-danger" style={{ position: 'absolute' }}>
            {bookmarks || ''}
          </p>
        ) : (
          ''
        )}
        <span />
      </div>
    );
  }
}
BookmarkArticle.propTypes = {
  article: PropTypes.object,
  bookmarkArticle: PropTypes.func,
  bookmarks: PropTypes.object,
  isAuth: PropTypes.bool
};

const mapStateToProps = ({ user: { isAuth }, articles: { article }, bookmarks }) => ({
  article,
  bookmarks,
  isAuth
});

export default connect(
  mapStateToProps,
  { bookmarkArticle }
)(BookmarkArticle);