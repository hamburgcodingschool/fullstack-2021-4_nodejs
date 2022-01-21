title: NodeJS Course
subtitle: Session 3 - async
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
.logo[![logo](hcs_mid_32x.png)]

---

class: titlepage

# {{title}}

## {{subtitle}}

---

# Async JavaScript

- Governs how we perform tasks which take some time to complete (e.g. getting data from the internet or the database)

.center[.big[Start something now and finish later]]

---

# Synchronous JavaScript

- JavaScript can run **one** statement at a time

```javascript
console.log("line one");
console.log("line two");
console.log("line three");
```

- if a statement takes long, it blocks the code from running

---

# Single Threaded

[![](https://mermaid.ink/img/pako:eNpdjzEOgzAMRa8SeYah0ClDJ3qCdvRiEVMikQQFZ0CIu9eVWlXgydZ7X1_eoE-OwcIr0zyaZ4fR6CxCwoGjXExd3_5nc8LNEbcn3B7xFSoInAN5p43bR0aQURmC1dXxQGUSBIy7qmV2Grw7LymDHWhauAIqkh5r7MFKLvyTOk_6QPha-xtqO0fi)](https://mermaid.live/edit#pako:eNpdjzEOgzAMRa8SeYah0ClDJ3qCdvRiEVMikQQFZ0CIu9eVWlXgydZ7X1_eoE-OwcIr0zyaZ4fR6CxCwoGjXExd3_5nc8LNEbcn3B7xFSoInAN5p43bR0aQURmC1dXxQGUSBIy7qmV2Grw7LymDHWhauAIqkh5r7MFKLvyTOk_6QPha-xtqO0fi)

---

# Async to the rescue

.big[Start something now and finish later]

[![](https://mermaid.ink/img/pako:eNptkD0PgkAMhv_KpTMMgNMNTri56eY5FK4IEe4I9AZD-O8WP2Igdmr7PHnTdILSWwINtwH7Wp1z45TUyMjUkeNExfH-N6YbnK5xtsHZGu_-4sYml6N3N2WRscCRVIlte327Al_SsiqwvEMEHQ0dNlZunhbHANeSZkBLa6nC0LIB42ZRQy-ZdLAN-wF0he1IEWBgf3q4EjQPgb5S3qC8oPtY8xPjFlyw)](https://mermaid.live/edit#pako:eNptkD0PgkAMhv_KpTMMgNMNTri56eY5FK4IEe4I9AZD-O8WP2Igdmr7PHnTdILSWwINtwH7Wp1z45TUyMjUkeNExfH-N6YbnK5xtsHZGu_-4sYml6N3N2WRscCRVIlte327Al_SsiqwvEMEHQ0dNlZunhbHANeSZkBLa6nC0LIB42ZRQy-ZdLAN-wF0he1IEWBgf3q4EjQPgb5S3qC8oPtY8xPjFlyw)

---

# Example

```javascript
console.log(1);
console.log(2);

setTimeout(() => {
  console.log("callback function fired");
}, 2000);

console.log(3);
console.log(4);
```

---

# Thank you

## Tobias Schulz-Hess

[.color1[<i class="fas fa-envelope"></i> tobias@hamburgcodingschool.com]](mailto:tobias@hamburgcodingschool.com)

[.color2[<i class="fab fa-slack"></i> Tobias Schulz-Hess]](https://hamburgcodingschool.slack.com/archives/D026E6LB0PN)

[.color4[<i class="fab fa-twitter"></i> ToBe_HH]](https://twitter.com/ToBe_HH)
