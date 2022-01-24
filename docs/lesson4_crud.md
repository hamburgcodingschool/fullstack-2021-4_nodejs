title: NodeJS Course
subtitle: Session 4 - CRUD
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

# CRUD

- C = Create
- R = Read
- U = Update
- D = Delete

.center[Basic operations to work with data]

---

# CRUD in HTTP

| **CRUD** | **HTTP requet type** |
| -------- | -------------------- |
| Create   | POST                 |
| Read     | GET                  |
| Update   | PUT                  |
| Delete   | DELETE               |

---

# CRUD in Express

| **CRUD** | **HTTP requet type** | **Express method** |
| -------- | :------------------: | :----------------: |
| Create   | POST                 | `app.post()`       |
| Read     | GET                  | `app.get()`        |
| Update   | PUT                  | `app.put()`        |
| Delete   | DELETE               | `app.delete()`     |
---

# Thank you

## Tobias Schulz-Hess

[.color1[<i class="fas fa-envelope"></i> tobias@hamburgcodingschool.com]](mailto:tobias@hamburgcodingschool.com)

[.color2[<i class="fab fa-slack"></i> Tobias Schulz-Hess]](https://hamburgcodingschool.slack.com/archives/D026E6LB0PN)

[.color4[<i class="fab fa-twitter"></i> ToBe_HH]](https://twitter.com/ToBe_HH)
