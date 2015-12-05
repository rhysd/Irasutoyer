Irasutoyer
==========

This is a desktop app for [いらすとや(Irasutoya)](http://www.irasutoya.com/) lovers.  You can search many (10000+) illustrations incrementally and access the illustration page quickly.

- __Cross Platform__: Available on OS X, Linux, (hopefully) Windows.
- __Simplicity__: Simplistic UI and no configuration.
- __High Performance__: You can see and search the very long (10000+ items) list.

This application is built on [Electron](https://github.com/atom/electron), [React](https://facebook.github.io/react/), [Redux](https://github.com/rackt/redux), and [material-ui](http://www.material-ui.com/#/).

![screenshot](https://raw.githubusercontent.com/rhysd/ss/master/Irasutoyer/Irasutoyer.gif)


## Installation

- [npm](https://www.npmjs.com/) package

```
$ npm install -g irasutoyer electron-prebuilt
$ irasutoyer
```


## Usage

At first start, app automatically scrapes illustration links (spinning the right above circle).
It takes long time (10 minutes or more).  I recommend you to make a cup of coffee and have a break :coffee:.

![scraping](https://raw.githubusercontent.com/rhysd/ss/master/Irasutoyer/scraping.gif)

After scraping succeeds, all illustrations would be listed in window.  You can search incrementally by entering search words to a text area on the top of window.
All links are cached as json in user directory.  If you want to update the cache, click the circle button on right above of the window.

If you find the illustration you want, click the item in list to open illustration page in browser.  You can also click 'Actions' button in right hand side of item.
You can do below actions as well.

- Copy URL to clipboard
- Copy markdown format link to clipboard
- Copy thumbnail image to clipboard
- Open category page in your browser

![item actions](https://raw.githubusercontent.com/rhysd/ss/master/Irasutoyer/menu-items.gif)

## Development

I use Ruby and `rake` for build scripts.

```sh
$ rake dep    # Install dependencies
$ rake build  # Build
$ rake run    # Run application
```
