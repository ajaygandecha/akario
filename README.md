# Akario

**Akario** is a web app of *Akari*. Akari, also known as *Light Up*, is a logic puzzle game originally created by [Nikoli (ニコリ)](https://www.nikoli.co.jp/en/), a Japanese publisher that specializes in creating games and logic puzzles. Nikoli became prominent around the world due to the popularity of another logic puzzle game they created, *Sudoku*.

## Website Link

Akario is hosted using Vercel and is **available now** to play at [https://akario-ajaygandecha.vercel.app](https://akario-ajaygandecha.vercel.app)!

## Technologies and Approach

Part of my goal for this project was to employ the full-stack development tools and technologies heavily used as standard in industry. I wanted the project to be typesafe, streamlined, and fully integrated together. With this goal in mind, I employed the following technologies into my project:

![TypeScript](https://img.shields.io/badge/-TypeScript-05122A?style=flat&logo=typescript)

TypeScript is a superset of JavaScript that adds static typing to traditional JavaScript. While TypeScript seemed more tedious to work with at first, using it instead of JavaScript really helped to reduce errors in the long run due to more strict typing rules. Therefore, I opted to use TypeScript for this project. In addition, TypeScript is the preferred language for the framework below. 

![NextJS](https://img.shields.io/badge/-Next.js-05122A?style=flat&logo=next.js)

Next.js is a frontend framework built on the React library that enables rich features and optimizations to the application, such as hybrid static & server rendering, which greatly increases speeds without sacrificing user experience.

Next.js has become an [industry standard](https://nextjs.org/showcase), with companies such as Twitch, Hulu, Target, Notion, Nike, and more utiziling it. I wanted to gain more experience developing with Next.js, so I decided to use it in this project.

![React](https://img.shields.io/badge/-React.js-05122A?style=flat&logo=react)

React is an extremely powerful framework for creating fully functional user interfaces and UI components. React is automatically built into Next.js, so I used React to create all of the UI in Akario.

![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-05122A?style=flat&logo=tailwindcss)

Tailwind CSS is a CSS framework that makes designing user interfaces extremely easy. Instead of having a bunch of CSS classes and files littered throughout the project, Tailwind CSS creates a bunch of classes for every possible style that can be applied to HTML and React components. Then at build time, only the necessary CSS classes are included in the final app, reducing the final bundle size.

![Prisma](https://img.shields.io/badge/-Prisma-05122A?style=flat&logo=prisma)

Prisma is a very powerful and easy-to-use ORM that allows Next.js projects to connect to external databases. Prisma abstracts away SQL queries, and instead, allows data to be queried and accessed using TypeScript.

![PlanetScale](https://img.shields.io/badge/-PlanetScale-05122A?style=flat&logo=planetscale)

PlanetScale is the database hosting of choice for this project. PlanetScale is a MySQL database which connects very easily to Next.js projects using Prisma. PlanetScale also allows database branching, which is a pretty cool way to test changes without immediately making changes to deployment.

![Vercel](https://img.shields.io/badge/-Vercel-05122A?style=flat&logo=vercel)

Vercel, the company behind Next.js, also offers hosting. I used Vercel to host this particular project.

## Current Status

Akario is still actively developed! New puzzles, modes, and features will be released very soon.

## Credits
Contributors:
- [Ajay Gandecha](https://www.ajaygandecha.com)

Akario is heavily based on the original logic puzzle, *Akari*, created by Nikoli:
- [Nikoli](https://www.nikoli.co.jp/en/)
