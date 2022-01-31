# Node.js course

## Full Stack Course - January 2022

### ✏️ Homework

- Make sure MySQL is running - example code from lesson 5 is running

For this and next lesson:

- Write an URL shortener convert a long url to a short one
  - Example: bit.ly/short
  - We have 2 parts: admin interface / actual usage
  - Admin interface:
    - enter an URL and the short_name
    - modify and delete it
  - Usage part:
    - if user enters the short_name, they are redirected
    - use the : in the path statement `app.get('/:shortened')...`
    - redirect using http status code 301 and `res.redirect(url)`
  - Database is up to you (Array list is also fine)
  - Advanced part:
    - do some error checking, that short_name does not contain ` ` or `/`
    - hide the admin part behind authentication

### 📄 Docs

- [Lesson Summary](docs/summary.md)

- [Handout](<docs/Handout - Node.js.pdf>)

- [Outline](<docs/Outline - Node.js.pdf>)

### 🤔 Questions?

Use the Slack channel [#fullstack-2021-4](https://hamburgcodingschool.slack.com/archives/C02GL3YPG0M)

> To join Slack just click on this [link](https://hamburgcodingschool.slack.com/join/shared_invite/enQtMjczNDI3OTE4NzIwLTE2ZmNkNDk5YTg3MDFlOTY2ZmU2YzU5YTU4MTNhNDg4MTRhNTMwYzFiNTdlOTdhYzllYzg5YmVkYzljNWExY2U#/)
