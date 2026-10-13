<div align="center">

# 🔥 Igniting Our App

**Day 2 of learning React: npm, bundlers and Parcel**

![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white)
![Parcel](https://img.shields.io/badge/Parcel-2.16-21374B?logo=parcel&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)

</div>

## 📑 Table of Contents

- [What is npm?](#-what-is-npm)
- [Initialising a project](#-initialising-a-project)
- [Installing Parcel](#️-installing-parcel)
- [Running the app](#️-running-the-app)
- [What Parcel does](#-what-parcel-does)
- [Browserslist](#-browserslist)
- [Production build](#️-production-build)

## 📦 What is npm?

Website: [npmjs.com](https://www.npmjs.com)

> [!NOTE]
> npm does **not** stand for "Node Package Manager". It has no official full form.

npm is a package manager and a standard repository where all kinds of packages are hosted.

## 🚀 Initialising a project

```bash
npm init
```

This creates a `package.json` file.

| Term         | Meaning                                                     |
| ------------ | ----------------------------------------------------------- |
| Package      | Also called a **dependency**                                |
| Bundler      | Bundles all the code for production (webpack, Vite, Parcel) |
| package.json | Holds the project configuration and its dependencies        |

## ⚙️ Installing Parcel

```bash
npm install -D parcel
```

`-D` installs it as a **dev dependency**.

### 🔒 package-lock.json

- Keeps track of the exact version of every installed package.
- Locks the full dependency tree so installs stay consistent.

### 🏷️ Version symbols

```json
"devDependencies": {
  "parcel": "^2.16.4"
}
```

| Symbol | Name  | Example   | Auto-updates               |
| ------ | ----- | --------- | -------------------------- |
| `^`    | Caret | `^2.16.4` | Minor and patch versions   |
| `~`    | Tilde | `~2.16.4` | Patch versions only        |

> [!TIP]
> `^` (caret) is the preferred option.

### 📁 node_modules

- Contains all the code fetched from npm.
- Includes the dependencies of dependencies, known as **transitive dependencies**.

## ▶️ Running the app

```bash
npx parcel index.html
```

`npx` is used to execute a package.

## ✨ What Parcel does

| Feature                   | Description                                      |
| ------------------------- | ------------------------------------------------ |
| Dev build                 | Fast development builds                          |
| Local server              | Serves the app locally                           |
| HMR                       | Hot Module Replacement, refreshes the page automatically |
| File watching algorithm   | Written in C++                                   |
| Caching                   | Faster rebuilds                                  |
| Image optimisation        | Optimises images                                 |
| Bundling                  | Combines files into bundles                      |
| Compression               | Minifies and compresses output                   |
| Consistent hashing        | Stable file hashes for caching                   |
| Differential bundling     | Supports older browsers                          |
| Diagnostics               | Clear error messages and error handling          |
| HTTPS                     | Can serve the app over HTTPS                     |
| Tree shaking              | Removes unused code                              |
| Separate dev/prod bundles | Different output per environment                 |

## 🌐 Browserslist

Set in `package.json`:

```json
"browserslist": [
  "last 2 Chrome versions",
  "last 2 Firefox versions"
]
```

**Does this mean it only works in these two browsers?**

No. It will definitely work in these two browsers, and it might not work in others.

## 🏗️ Production build

```bash
npx parcel build index.html
```
