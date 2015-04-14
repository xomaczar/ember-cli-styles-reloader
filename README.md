# Ember-cli-styles-reloader
Reloads changed styles (css|scss|sass|less|styl) without reloading the entire ember-cli app.

## Installation

### As an Ember CLI addon

In your ember-cli project run

```bash
npm install --save-dev ember-cli-styles-reloader
```

## Configurations

* All style changes can be animated to smoothly transition between new/old change sets.
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
