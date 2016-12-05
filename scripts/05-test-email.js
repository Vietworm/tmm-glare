import ReactHTMLEmail from 'react-html-email'
ReactHTMLEmail.injectReactEmailAttributes()

require('dotenv').config()
const config = require('config')
import postmark from 'postmark'

import email from '../server/email/welcome'
const html = ReactHTMLEmail.renderEmail(email)

const client = new postmark.Client(config.postmark.id)

client.sendEmail({
  From: 'm@glare.fm',
  To: 'mail@the-m-machine.com',
  Subject: 'Welcome to glare.fm',
  HtmlBody: html,
}, (err, result) => {
  console.log('🍕', err, result)
})
