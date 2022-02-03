title: NodeJS Course
subtitle: Session 4 - fetch()
organisation: Hamburg Coding School
class: animation-fade
layout: true

<!-- This is a presentation using backslide to convert the markdown into slides.
     See https://github.com/sinedied/backslide for more details.
     Run backslide as a docker via
     docker run --rm --init -p 4100:4100 -v $PWD:/src registry.gitlab.com/mpolitze/backslide-docker:latest serve -s -p 4100
-->

<!-- This slide will serve as the base layout for all your slides -->

.bottom-bar[
{{title}} -- {{subtitle}} -- {{organisation}}
]
.logo[![logo](slide_images/hcs_mid_32x.png)]

---

class: titlepage

# {{title}}

## {{subtitle}}


---

<h1>Basic usage</h1>

.big[
```javascript
fetch("/getSomething")
```
]

Makes a request to server to the URL http://localhost:3000/getSomething as a GET request

--

We can also add variables to the URL:
```javascript
fetch(`/getSomethingElse/${id}`)
```

---

# Sending data with get

**Important: get does not support sending bodies!!!**

so: whatever kind of information we send: we need to send it as path or as query parameter

### sending it with the path:
```javascript
fetch(`/getSomethingElse/${text}`) 
```
does not work for a text like "bla/foo" or "bla foo" (space!)

---

# Sending data with get

**Important: get does not support sending bodies!!!**

so: whatever kind of information we send: we need to send it as path or as query parameter

### sending it via query parameter:
```javascript
fetch(`/getSomethingElse?data=${text}`) 
```
text would be URL encoded and end up like "bla%20foo" 

---

# Optional parameters

`fetch()` has a big number of parameters - see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

for us right now only 3 are interesting: `method`, `content-type`, `body`

- `body` used to send data to the server
- `method` to indicate, which method (CRUD)
- `content-type` to indicate we are dealing with json data

---

# Example

```javascript
fetch("/database", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataToSend)
});
```

With the `method` POST, PUT, DELETE you can implement the CRUD principle.
But using POST, DELETE or PUT is only a convention!!!
Another principle would be to only use post but differentiate what needs to be done via the URL

---

# Why JSON?

We only use json, because it works nicely with javascript.
Like `JSON.parse()` creates an object, which we then can access with `data.foo`

Instead we could use anything else (xml, plain text, yaml, ...).

Because we can send anything, we need to tell the server, what kind of dat we are sending
(this is the content type).


---

# Thank you

## Tobias Schulz-Hess

[.color1[<i class="fas fa-envelope"></i> tobias@hamburgcodingschool.com]](mailto:tobias@hamburgcodingschool.com)

[.color2[<i class="fab fa-slack"></i> Tobias Schulz-Hess]](https://hamburgcodingschool.slack.com/archives/D026E6LB0PN)

[.color4[<i class="fab fa-twitter"></i> ToBe_HH]](https://twitter.com/ToBe_HH)
