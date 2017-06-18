## Folder Structure

The project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    mnifest.json
  src/
    asset/
      image/
        logo.png
    actions/
      jobs.js
    component/ ### include js, css only for this component
      foot/
      header/
      job-card/
      job-filter/
      search-result/
    reducer/
      index.js
      jobs.js
    store/
    mock/
      fileMock.js
    App.css
    App.js
    App.test.js
    index.css
    index.js ### running script
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>

### `npm run test` | `npm run test:watch`

The unit test for
1. actions (src/actions/job.test.js)
2. job card (src/component/job-card/job-card.test.js)
3. app rendering (App.test.js)

### `npm run build` # using webpack
