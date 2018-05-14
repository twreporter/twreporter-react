/*global before, beforeEach, afterEach, describe, it*/
import 'babel-polyfill'
import { expect } from 'chai'
import { host, devices, routes } from './static/screenshot.config'
import { PNG } from 'pngjs'
import fs from 'fs'
import pixelmatch from 'pixelmatch'
import puppeteer from 'puppeteer'

const screenshotsDir = './src/test/screenshots'
const testDir = `${screenshotsDir}/testDir`
const groundtruthDir = `${screenshotsDir}/groundtruth`

describe('Screenshot Testing: Check if screenshots are correct', function () {
  let browser, page

  // This is ran when the suite starts up.
  before(async function () {
    if (fs.existsSync(testDir)) {
      await _deleteFolderRecursive(testDir)
      fs.mkdirSync(testDir)
    } else {
      fs.mkdirSync(testDir)
    }
    devices.forEach((device) => {
      if (!fs.existsSync(`${testDir}/${device.name}`)) fs.mkdirSync(`${testDir}/${device.name}`)
    })
  })

  // This is ran before every test: start a clean browser.
  beforeEach(async function () {
    browser = await puppeteer.launch()
    page = await browser.newPage()
  })

  // This is ran after every test: clean up.
  afterEach(() => browser.close())

  devices.forEach((device)=>{
    describe(`====> ${device.name}: ${device.width} x ${device.height}`, function () {
      routes.forEach((route) => {
        it(route.name, async function () {
          await page.setViewport({ width: device.width, height: device.height })
          return _takeAndCompareScreenshot(page, route.route, device.name)
        }).timeout(0)
      })
    })    
  })
})

/**
 * Take screenshot and compare the screenshot with ground-truth screenshot image
 * 
 * @param {Object} page 
 * @param {String} route 
 * @param {String} filePrefix
 * @returns {Object} - A promise
 */
async function _takeAndCompareScreenshot(page, route, filePrefix) {
  let fileName = filePrefix + '/' + (route ? _getSlug(route) : 'homepage')
  await page.goto(`${host}/${route}`, {
    timeout: 0,
    waitUntil: [ 'load', 'networkidle0' ]
  })
  // Here is a work around to keep the slider stay on one slide
  // in order to get consistent screenshots
  if (route === 'photography') {
    await page.addStyleTag({
      content: `
        .topnews>ol [aria-current="true"]{ 
          background-color: #BEC0BC!important;
        }
        .topnews>ol li:first-child{ 
          background-color: black!important;
        }
      `
    })
    await page.addScriptTag({
      content: `
        window.setInterval(() => {
          document.querySelector('.topnews > ul').style.transform = 'translateX(-200%)';
          document.querySelector('.topnews > ul').style.transitionProperty = 'none';
        }, 15)
      `
    })
  } else if (route === 'topics/migrant-workers-death-in-taiwan') {
    await _timeout(3000) //Waiting for progressive image loading 
  }

  const bodyHandle = await page.$('body')
  const { width, height } = await bodyHandle.boundingBox()
  await page.screenshot({
    path: `${testDir}/${fileName}.png`,
    clip: {
      x: 0,
      y: 0,
      width,
      height
    },
    type: 'png'
  })
  await bodyHandle.dispose()
  return _compareScreenshots(fileName)
}

/**
 * 
 * @param {String} fileName
 * @returns {Object} - A promise
 */
function _compareScreenshots(fileName) {
  return new Promise((resolve) => {
    const img1 = fs.createReadStream(`${testDir}/${fileName}.png`).pipe(new PNG()).on('parsed', _doneReading)
    const img2 = fs.createReadStream(`${groundtruthDir}/${fileName}.png`).pipe(new PNG()).on('parsed', _doneReading)

    let filesRead = 0
    function _doneReading() {
      // Wait until both files are read.
      if (++filesRead < 2) return

      // The files should be the same size.
      expect(img1.width, 'image widths are the same').equal(img2.width)
      expect(img1.height, 'image heights are the same').equal(img2.height)

      // Do the visual diff.
      const diff = new PNG({ width: img1.width, height: img1.height })
      const numDiffPixels = pixelmatch(
        img1.data, img2.data, diff.data, img1.width, img1.height,
        { threshold: 0.9 })
      // Write out the difference
      if (numDiffPixels > 0) {
        diff.pack().pipe(fs.createWriteStream(`${testDir}/${fileName}-diff.png`))
      }
      expect(numDiffPixels, 'number of different pixels').equal(0)
      resolve()
    }
  })
}

/**
 * 
 * @param {String} route
 * @returns {String} - slug
 */
function _getSlug(route) {
  const arr = route.split('/')
  return arr[arr.length - 1]
}

/**
 * Delete a folder recursively.
 * 
 * @param {String} path 
 * @returns {Object} - A promise
 */
function _deleteFolderRecursive(path) {
  return new Promise((resolve) => {
    fs.readdirSync(path).forEach(function (file) {
      let curPath = path + '/' + file
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        _deleteFolderRecursive(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
    resolve()
  })
}

/**
 * 
 * @param {Number} ms - unit of milisecond
 * @returns {Object} - A promise
 */
function _timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
