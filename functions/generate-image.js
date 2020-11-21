require('dotenv').config()
const fetch = require('node-fetch')
const chromium = require('chrome-aws-lambda')
const cloudinary = require('cloudinary').v2
const helpers = require('../src/helpers')
const { slugify, objectToParams } = helpers

const local = process.env.NODE_ENV === 'development'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})
const cloudFolder = 'social-images'

const getImage = async function(title) {
  const url = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD}/image/upload/social-images/${title}.png`
  return await fetch(url)
    .then(result => {
      if (result.status !== 404) {
        return url
      } else {
        return null
      }
    })
}

const takeScreenshot = async function(url) {
  const browser = await chromium.puppeteer.launch({
    // launch desktop chrome on local??
    executablePath: local ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  })
  const page = await browser.newPage()
  await page.setViewport({ height: 630, width: 1200 })
  await page.goto(url)
  const buffer = await page.screenshot()
  await browser.close()
  return buffer
}

const putImage = async function(title, buffer) {
  const cloudinaryOptions = {
    public_id: `${cloudFolder}/${title}`,
    unique_filename: false
  }
  const base64 = `data:image/png;base64,${buffer.toString('base64')}`
  console.log(`uploading ${title} to cloudinary`)
  return await cloudinary.uploader.upload(base64, cloudinaryOptions)
    .then(response => response.url)
}

exports.handler = async function(event) {
  if (!event.queryStringParameters) {
    console.log(`no params`)
    return
  }

  const title = slugify(event.queryStringParameters.title)
  console.log(`post: ${title}`)

  const existingImage = await getImage(title)

  const response = async (imageUrl) => {
    return {
      statusCode: 301,
      headers: {
        'location': cloudinary.url(imageUrl, { sign_url: true })
      },
      body: ''
    }
  }

  if (existingImage) {
    console.log(`yay, ${title} already existed`)
    return response(existingImage)
  }

  const url = local ? `http://${event.headers.host}` : `https://${event.headers.host}`
  const imageParams = objectToParams(event.queryStringParameters)
  const screenshotBuffer = await takeScreenshot(`${url}/generate-image?${imageParams}`)
  const newImage = await putImage(title, screenshotBuffer)
  return response(newImage)
}
