import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import axios from 'axios'
import get from 'lodash/get'
import TagManager from 'react-gtm-module'
import { PillButton } from '@twreporter/react-components/lib/button'
import {
  colorGrayscale,
  colorOpacity,
} from '@twreporter/core/lib/constants/color'
import { fontFamily } from '@twreporter/core/lib/constants/font'
import zIndex from '@twreporter/core/lib/constants/z-index'
import mq from '@twreporter/core/lib/utils/media-query'
import twreporterRedux from '@twreporter/redux'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { candidateSlugs } from '../../constants/jai-ab-test'
import siteMeta from '../../constants/site-meta'
import {
  observePopupEligibility,
  selectCandidateSlugs,
} from '../../utils/jai-popup'
import loggerFactory from '../../logger'

const { formURL } = twreporterRedux.utils

const Mask = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${zIndex.popup};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: ${colorOpacity['black_0.2']};
`
const Dialog = styled.div`
  box-sizing: border-box;
  width: 480px;
  max-width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 48px;
  border-radius: 24px;
  background: ${colorGrayscale.white};
  box-shadow: 0 0 24px ${colorOpacity['black_0.1']};
  color: ${colorGrayscale.gray800};
  font-family: ${fontFamily.default};
  line-height: 1.5;
  ${mq.mobileOnly`
    width: 300px;
    padding: 24px;
  `}
`
const Heading = styled.h2`
  margin: 0 0 4px;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  ${mq.mobileOnly`font-size: 22px;`}
`
const Intro = styled.p`
  margin: 0 0 24px;
  text-align: center;
  font-size: 14px;
  color: ${colorGrayscale.gray600};
`
const PostLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  color: inherit;
  text-decoration: none;
  & + & {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid ${colorGrayscale.gray300};
  }
  &:focus-visible {
    outline: 2px solid ${colorGrayscale.gray800};
    outline-offset: 4px;
  }
  ${mq.mobileOnly`gap: 8px;`}
`
const PostContent = styled.div`
  flex: 1;
  min-width: 0;
`
const Category = styled.p`
  margin: 0 0 8px;
  color: ${colorGrayscale.gray600};
  font-size: 12px;
  ${mq.mobileOnly`margin-bottom: 4px;`}
`
const Title = styled.h3`
  margin: 0;
  font-family: ${fontFamily.title};
  font-size: 16px;
  font-weight: 700;
  overflow-wrap: anywhere;
`
const Photo = styled.img`
  flex: none;
  width: 80px;
  height: 80px;
  object-fit: cover;
  ${mq.mobileOnly`
    width: 48px;
    height: 48px;
  `}
`
// The Figma cards show category and title; expose OG descriptions to assistive
// technology without adding text that is absent from the visual design.
const Description = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
`
const BackButton = styled(PillButton)`
  margin: 32px auto 0;
  width: 96px;
  box-sizing: border-box;
  justify-content: center;
  border-width: 1px;
`

const track = (event, parameters = {}) =>
  TagManager.dataLayer({ dataLayer: { event, ...parameters } })

export function FurtherReadingDialog({ posts, onBack }) {
  const dialogRef = useRef(null)
  const tracked = useRef(false)
  useEffect(() => {
    if (!tracked.current) {
      track('jai_popup_show')
      tracked.current = true
    }
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const dialog = dialogRef.current
    dialog.focus({ preventScroll: true })
    const containFocus = event => {
      if (!dialog.contains(event.target)) {
        dialog.focus({ preventScroll: true })
      }
    }
    const trapFocus = event => {
      if (event.key !== 'Tab') return
      const items = dialog.querySelectorAll('a[href], [role="button"]')
      const first = items[0]
      const last = items[items.length - 1]
      const focusOutside = !dialog.contains(document.activeElement)
      if (
        event.shiftKey &&
        (focusOutside ||
          document.activeElement === first ||
          document.activeElement === dialog)
      ) {
        event.preventDefault()
        last.focus({ preventScroll: true })
      } else if (
        !event.shiftKey &&
        (focusOutside || document.activeElement === last)
      ) {
        event.preventDefault()
        first.focus({ preventScroll: true })
      }
    }
    document.addEventListener('keydown', trapFocus, true)
    document.addEventListener('focusin', containFocus)
    return () => {
      document.removeEventListener('keydown', trapFocus, true)
      document.removeEventListener('focusin', containFocus)
      document.body.style.overflow = previousOverflow
      if (previousFocus && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true })
      }
    }
  }, [])

  const back = () => {
    track('jai_popup_click_back')
    onBack()
  }
  return createPortal(
    <Mask
      onPointerDown={event => {
        if (event.target === event.currentTarget) {
          event.preventDefault()
          dialogRef.current.focus({ preventScroll: true })
        }
      }}
    >
      <Dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="jai-popup-title"
        aria-describedby="jai-popup-intro"
        tabIndex={-1}
      >
        <Heading id="jai-popup-title">編輯推薦</Heading>
        <Intro id="jai-popup-intro">讀到這裡，也推薦你閱讀這些深度報導</Intro>
        {posts.map(post => (
          <PostLink
            key={post.slug}
            to={`/a/${post.slug}`}
            aria-describedby={`jai-description-${post.slug}`}
            onClick={() =>
              track('jai_popup_click_read', { post_slug: post.slug })
            }
          >
            <PostContent>
              {post.category && <Category>{post.category}</Category>}
              <Title>{post.title}</Title>
              <Description id={`jai-description-${post.slug}`}>
                {post.description}
              </Description>
            </PostContent>
            <Photo src={post.image} alt="" />
          </PostLink>
        ))}
        <BackButton
          text="回到閱讀"
          size={PillButton.Size.S}
          style={PillButton.Style.DARK}
          type={PillButton.Type.SECONDARY}
          role="button"
          tabIndex={0}
          onClick={back}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              back()
            }
          }}
        />
      </Dialog>
    </Mask>,
    document.body
  )
}

FurtherReadingDialog.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
  onBack: PropTypes.func.isRequired,
}

// Mounted only for group A, keyed by the current article (and user) by Article.
export default function FurtherReadingPopup({ currentSlug }) {
  const apiOrigin = useSelector(state => get(state, 'origins.api'))
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const shown = useRef(false)

  useEffect(() => {
    if (!apiOrigin) return
    let cancelled = false
    const source = axios.CancelToken.source()
    const slugs = selectCandidateSlugs(candidateSlugs, currentSlug)
    setPosts([])
    Promise.all(
      slugs.map(async slug => {
        try {
          const response = await axios.get(
            formURL(apiOrigin, `/v2/posts/${encodeURIComponent(slug)}`),
            { cancelToken: source.token, timeout: 10000 }
          )
          const post = get(response, 'data.data')
          if (!post || post.slug !== slug || !(post.og_title || post.title))
            return null
          return {
            slug,
            title: post.og_title || post.title,
            description: post.og_description || '',
            image: replaceGCSUrlOrigin(
              get(post, 'og_image.resized_targets.tablet.url') ||
                siteMeta.ogImage.url
            ),
            category: get(post, 'category_set[0].category.name', ''),
          }
        } catch (error) {
          if (!axios.isCancel(error)) {
            loggerFactory.getLogger().errorReport({
              report: error,
              message: `Error fetching JAI popup post: ${slug}`,
            })
          }
          return null
        }
      })
    ).then(results => {
      if (!cancelled) setPosts(results.filter(Boolean))
    })
    return () => {
      cancelled = true
      source.cancel()
    }
  }, [apiOrigin, currentSlug])

  useEffect(() => {
    if (!posts.length || shown.current) return
    return observePopupEligibility({
      win: window,
      doc: document,
      onEligible: () => {
        shown.current = true
        setOpen(true)
      },
    })
  }, [posts])

  return open && posts.length ? (
    <FurtherReadingDialog posts={posts} onBack={() => setOpen(false)} />
  ) : null
}

FurtherReadingPopup.propTypes = {
  currentSlug: PropTypes.string.isRequired,
}
