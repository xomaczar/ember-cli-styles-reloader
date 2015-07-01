[![view on npm](http://img.shields.io/npm/v/ember-cli-styles-reloader.svg)](https://www.npmjs.org/package/ember-cli-styles-reloader)
[![npm module downloads per month](http://img.shields.io/npm/dm/ember-cli-styles-reloader.svg)](https://www.npmjs.org/package/ember-cli-styles-reloader)
[!(https://travis-ci.org/xomaczar/ember-cli-styles-reloader.svg)]
# Ember-cli-styles-reloader
Reloads changed styles (css|scss|sass|less|styl) without reloading the entire ember-cli app.

## Installation

Run either command below depending on Ember version in your project folder.

For Ember CLI >= `0.2.3`:

```shell
ember install ember-cli-styles-reloader
```

For Ember CLI < `0.2.3`:

```shell
ember install:addon ember-cli-styles-reloader
```

## Configurations

* All style changes can be animated to smoothly transition between old/new change sets.
By default this feature is disabled, in order to not interfere with existing transition(s) defined
in your app. To enable it:

```javascript
//your-app/config/environment.js

 ENV['ember-cli-styles-reloader'] = {
    animateChanges: true
};
```

## Running

* `ember server`
* Visit your app at http://localhost:4200

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
