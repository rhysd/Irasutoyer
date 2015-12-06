Irasutoyer
==========

This is a desktop app for [いらすとや(Irasutoya)](http://www.irasutoya.com/) lovers.  You can search many (10000+) illustrations incrementally and access the illustration page quickly.

- __Cross Platform__: Available on OS X, Linux, (hopefully) Windows.
- __Simplicity__: Simplistic UI and no configuration.
- __High Performance__: You can see and search the very long (10000+ items) list.

This application is built on [Electron](https://github.com/atom/electron), [React](https://facebook.github.io/react/), [Redux](https://github.com/rackt/redux), and [material-ui](http://www.material-ui.com/#/).

![screenshot](https://raw.githubusercontent.com/rhysd/ss/master/Irasutoyer/Irasutoyer.gif)


## Installation

- [Package releases](https://github.com/rhysd/Irasutoyer/releases)
- [npm](https://www.npmjs.com/) package

```
$ npm install -g irasutoyer electron-prebuilt
$ irasutoyer
```

Currently Irasutoyer is only distributed as npm package.  If you want packed isolated package, please let me know by creating issue.

## Usage

All illustrations are listed in window.  You can search incrementally by entering search words to a text area on the top of window.

When you find the illustration you want, click the item in list to open illustration page in browser.  You can also click 'Actions' button in right hand side of item.
You can do below actions as well.

- Copy URL to clipboard
- Copy markdown format link to clipboard
- Copy thumbnail image to clipboard
- Open category page in your browser

![item actions](https://raw.githubusercontent.com/rhysd/ss/master/Irasutoyer/menu-items.png)

Illustrations on いらすとや are frequently updated everyday.  If you want to follow up to the update, please scrape again by clicking the circle button on right above of the window.  It takes long time (10 minutes or more).  I recommend you to make a cup of coffee and have a break :coffee:.  Scraping result is preserved in user directory as JSON.

![scraping](https://raw.githubusercontent.com/rhysd/ss/master/Irasutoyer/scraping.gif)

## (Maybe) TODO

- Search categories
- Search illustrations in specific category

## Development

I use Ruby and `rake` for build scripts.

```sh
$ rake dep    # Install dependencies
$ rake build  # Build
$ rake run    # Run application
```
