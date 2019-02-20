import PropTypes from 'prop-types'

const articleMetaForBookmark = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  is_external: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  published_date: PropTypes.string.isRequired
})

const bookmark = PropTypes.shape({
  id: PropTypes.string,
  published_date: PropTypes.number,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
  deleted_at: PropTypes.string,
  slug: PropTypes.string,
  host: PropTypes.string,
  is_external: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  thumbnail: PropTypes.string
})

export default {
  articleMetaForBookmark,
  bookmark
}
