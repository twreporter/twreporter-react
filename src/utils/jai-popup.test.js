/* global describe, it, beforeEach, afterEach */
import assert from 'assert'
import { observePopupEligibility, selectCandidateSlugs } from './jai-popup'

describe('JAI popup', () => {
  it('samples distinct candidates and excludes the current post', () => {
    for (let i = 0; i < 100; i++) {
      const selected = selectCandidateSlugs(
        ['current', 'a', 'a', 'b'],
        'current'
      )
      assert.deepStrictEqual(selected.sort(), ['a', 'b'])
    }
    assert.deepStrictEqual(selectCandidateSlugs(['current'], 'current'), [])
    assert.deepStrictEqual(selectCandidateSlugs([], 'current'), [])
    assert.deepStrictEqual(selectCandidateSlugs(['a'], 'current'), ['a'])
  })

  describe('continuous inactivity and scroll depth', () => {
    let now, timers, nextId, win, doc, shown, cleanup, realNow
    const target = () => {
      const listeners = new Map()
      return {
        addEventListener: (event, callback) => listeners.set(event, callback),
        removeEventListener: event => listeners.delete(event),
        emit: event => {
          if (listeners.has(event)) listeners.get(event)()
        },
        listeners,
      }
    }
    const advance = ms => {
      now += ms
      Array.from(timers).forEach(([id, timer]) => {
        if (timer.at <= now) {
          timers.delete(id)
          timer.callback()
        }
      })
    }
    beforeEach(() => {
      now = 0
      timers = new Map()
      nextId = 0
      shown = 0
      realNow = Date.now
      Date.now = () => now
      win = {
        ...target(),
        innerHeight: 1000,
        scrollY: 501,
        setTimeout: (callback, delay) => {
          const id = ++nextId
          timers.set(id, { callback, at: now + delay })
          return id
        },
        clearTimeout: id => timers.delete(id),
      }
      doc = {
        ...target(),
        visibilityState: 'visible',
        documentElement: { scrollHeight: 2000, scrollTop: 0 },
      }
      cleanup = observePopupEligibility({ win, doc, onEligible: () => shown++ })
    })
    afterEach(() => {
      cleanup()
      Date.now = realNow
    })

    it('requires strictly more than 90 seconds and shows only once', () => {
      advance(90000)
      assert.strictEqual(shown, 0)
      advance(1)
      assert.strictEqual(shown, 1)
      advance(90001)
      assert.strictEqual(shown, 1)
      assert.strictEqual(doc.listeners.size + win.listeners.size, 0)
    })

    it('requires strictly more than 50% of the scrollable page', () => {
      win.scrollY = 500
      advance(90001)
      assert.strictEqual(shown, 0)
      win.scrollY = 501
      doc.emit('scroll')
      advance(90001)
      assert.strictEqual(shown, 1)
    })
    ;[
      'pointermove',
      'pointerdown',
      'keydown',
      'touchstart',
      'wheel',
      'scroll',
    ].forEach(event => {
      it(`resets the entire inactivity period on ${event}`, () => {
        advance(60000)
        doc.emit(event)
        advance(30001)
        assert.strictEqual(shown, 0)
        advance(60000)
        assert.strictEqual(shown, 1)
      })
    })

    it('waits for visibility before recording an impression', () => {
      doc.visibilityState = 'hidden'
      doc.emit('visibilitychange')
      advance(90001)
      assert.strictEqual(shown, 0)
      doc.visibilityState = 'visible'
      doc.emit('visibilitychange')
      assert.strictEqual(shown, 1)
    })

    it('resets a short absence when the user returns', () => {
      advance(60000)
      win.emit('focus')
      advance(30001)
      assert.strictEqual(shown, 0)
      advance(60000)
      assert.strictEqual(shown, 1)
    })

    it('does not show on a page without scrollable content', () => {
      doc.documentElement.scrollHeight = 1000
      advance(90001)
      assert.strictEqual(shown, 0)
    })

    it('cancels timers and listeners on navigation/unmount', () => {
      cleanup()
      advance(90001)
      assert.strictEqual(shown, 0)
      assert.strictEqual(timers.size, 0)
      assert.strictEqual(doc.listeners.size + win.listeners.size, 0)
    })
  })
})
