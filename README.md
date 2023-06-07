<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Okazakee/ZTM-coffee-connoisseur">
    <img src="assets/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Coffee Connoisseur</h3>

  <p align="center">
    Discover your local coffee stores!
    <br />
    <a href="https://ztm-coffee-connoisseur.vercel.app/">View Live Demo</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

![Project screenshot][project-screenshot]

This is the first NextJS WebApp project committed from the [ZTM NextJS Course](https://www.udemy.com/course/complete-nextjs-developer-zero-to-mastery/).

The WebApp lets you find coffee stores near your location (Palermo set as default), the user can navigate through various coffee stores gathering their information such as it's name or address and can leave a star to upvote the coffee store.

### Built With

These are the major frameworks/APIs used in this project.

[![Next][Next.js]][Next-url]
[![Foursquare][Foursquare]][Foursquare-url]
[![Airtable][Airtable]][Airtable-url]
[![Unsplash][Unsplash]][Unsplash-url]

## How it works
Coffee stores data is gathered through Foursquare API, images are taken from Unsplash API, it is statically served for Palermo as the index default stores location, and dynamically served when user searches stores near himself, at first the store data is serverside rendered, then it's data is cached inside an Airtable base to be used when the same store is visited.

<!-- GETTING STARTED -->
## Getting Started

* Clone the repo:
```bash
git clone https://github.com/Okazakee/ZTM-coffee-connoisseur.git
```

* Install dependencies:
```bash
npm -i
# or
yarn
```

* Run the development server:

```bash
npm run dev
# or
yarn dev
```

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[project-screenshot]: assets/screenshot.png

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

[Airtable]: https://img.shields.io/badge/Airtable-20232A?style=for-the-badge&logo=airtable&logoColor=61DAFB
[Airtable-url]: https://airtable.com/

[Unsplash]: https://img.shields.io/badge/Unsplash-eeeeee?style=for-the-badge&logo=unsplash&logoColor=000000
[Unsplash-url]: https://Unsplash.com/

[Foursquare]: https://img.shields.io/badge/Foursquare-d9f1ee?style=for-the-badge&logo=foursquare&logoColor=000000
[Foursquare-url]: https://foursquare.com/