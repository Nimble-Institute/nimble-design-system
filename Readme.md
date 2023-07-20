<h1 align="center">
  <br>
  <a href="http://nimble-institute.github.io/nimble-design-system"><img src="./logo.webp" alt="Markdownify" width="200"></a>
  <br>
  Nimble Design System
  <br>
</h1>

<h4 align="center">This is the design system for Nimble front end react / typescript projects.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

## Key Features

- Autocomplete Component
  - Material UI Autocomplete wrapper component

## How To Use

You can use this npm package on any React project (Js / Typescript)

```bash
# Install the library
$ yarn add nimble-design-system

# Usage
import {NimbleAutoComplete} from 'nimble-design-system'

# Nimble Dialog Component Usage
import {NimbleDialog} from 'nimble-design-system'

  <NimbleDialog
    open={true}
    title="Sample Title"
    metaData={null}
    parimaryActionLabel="Save"
    onClickPrimaryAction={() => { alert(value)}}>
        <div>
          <br />
          <TextField
            label="Enter Name"
            size="small"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
  </NimbleDialog>

```

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/)
- [React Material UI](https://mui.com/)
- [React.js](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)

## License

MIT

---

> GitHub [@manoj201](https://github.com/Manoj201) &nbsp;&middot;&nbsp;
