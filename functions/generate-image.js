require('dotenv').config()
const fetch = require('node-fetch')
const chromium = require('chrome-aws-lambda')
const cloudinary = require('cloudinary').v2
const helpers = require('../src/lib/helpers')
const { slugify, objectToParams } = helpers

const local = process.env.NODE_ENV === 'development'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})
const cloudFolder = 'social-images'

const getImage = async function(title) {
  const url = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD}/image/upload/${cloudFolder}/${title}.png`
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
  return `data:image/png;base64,${buffer.toString('base64')}`
}

const putImage = async function(title, image) {
  const cloudinaryOptions = {
    public_id: `${cloudFolder}/${title}`,
    unique_filename: false
  }
  console.log(`uploading ${title} to cloudinary`)
  return await cloudinary.uploader.upload(image, cloudinaryOptions)
    .then(response => response.url)
}

const forwardResponse = async (imageUrl) => {
  return {
    statusCode: 308, // Permanent Redirect
    headers: {
      'location': cloudinary.url(imageUrl, { sign_url: true })
    },
    body: ''
  }
}

exports.handler = async function(event) {
  if (!event.queryStringParameters) {
    console.log(`no params given`)
    return
  }

  const title = slugify(event.queryStringParameters.title)
  console.log(`processing ${title}...`)

  const existingImage = await getImage(title)

  if (existingImage) {
    console.log(`yay, ${title} already existed`)
    return forwardResponse(existingImage)
  }

  console.log(`generating image for ${title}`)
  const url = local ? `http://${event.headers.host}` : `https://${event.headers.host}`
  const imageParams = objectToParams(event.queryStringParameters)
  const screenshot = await takeScreenshot(`${url}/generate-image?${imageParams}`)
  const newImage = await putImage(title, screenshot)
  console.log(`done with ${title}`)
  return forwardResponse(newImage)
}
