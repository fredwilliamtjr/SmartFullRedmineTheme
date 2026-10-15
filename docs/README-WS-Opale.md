WS Opale
========

A Linear.app-inspired theme for Redmine 6.x, based on [Opale](https://github.com/gagnieray/opale).

[![AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

---

![Screenshot](./screenshots/issues.png)

## What is this?

WS Opale is a fork of the excellent [Opale](https://github.com/gagnieray/opale) Redmine theme by [@gagnieray](https://github.com/gagnieray). It applies a **Linear.app-inspired design language** while preserving Opale's rock-solid layout and features.

### Changes from Opale

- **Colors**: Purple/indigo accent (#5E6AD2) replaces blue, darker purple hover states instead of red
- **Typography**: Inter font at 13px with -0.01em letter-spacing
- **Dark mode**: Automatic (prefers-color-scheme) + manual toggle in top menu
- **Refinements**: Larger border-radius (6px), smoother 150ms transitions

Everything else — left sidebar, responsive layout, icons, admin pages, plugin support — is unchanged from Opale.

## Features

* Left sidebar,
* Colored trackers links,
* Jira-inspired priority icons,
* Dark mode with toggle (sun/moon in top menu),
* Linear.app color palette and typography,
* Customizable with SCSS.

## Install

1. Download or clone this repository into your Redmine `themes` folder,
2. Rename the folder to `opale` (or any name you prefer),
3. Go to **Redmine > Administration > Settings > Display**, select the theme and save.

## Dark mode

Dark mode activates automatically based on your system preference (`prefers-color-scheme: dark`). A sun/moon toggle in the top menu bar allows manual override. The preference is stored in `localStorage`.

## Customize

If you want to customize further, install [Node.js](https://nodejs.org/) and run:

```bash
npm install
npm run watch
```

Override variables in `src/sass/_custom-variables.scss` — see the original [Opale documentation](https://github.com/gagnieray/opale) for details.

## Credits

- **Original theme**: [Opale](https://github.com/gagnieray/opale) by [@gagnieray](https://github.com/gagnieray) — AGPL-3.0
- **Linear.app modifications**: Kristijan Lukacin / [Web Solutions Ltd](https://websolutions.hr)

## License

AGPL-3.0 — same as the original Opale theme. See [LICENSE](./LICENSE).

Included components retain their original licenses:
* Normalize.css: [MIT](https://github.com/necolas/normalize.css/blob/master/LICENSE.md)
* Bootstrap Mixins: [MIT](https://github.com/twbs/bootstrap/blob/main/LICENSE)
* Tabler Icons: [MIT](https://github.com/tabler/tabler-icons/blob/main/LICENSE)
