# How To Contribute

## Contributing to the repo

### Development

About the environment requirements and how to run dev mode, see [#Environment](https://github.com/twreporter/twreporter-react#build-docker-image) and [#Development start](https://github.com/twreporter/twreporter-react#development-start).

### Opening a PR

You can submit your work as a pull request to our `master` branch if:

- you make a new feature or an enhancement
- you have a nice solution to a problem or a bug in our code
- you have any suggestion for the documentation or comments

### Opening an issue

You can [open an issue](https://github.com/twreporter/twreporter-react/issues) if:

- you have a suggestion for new feature
- you find a bug or a problem about the repo

Include your **environment information** in your issue if you want the problem to be resolved quickly. Such as:

- OS version
- Node version
- browser version
- `twreporter-react` version
- related dependencies version or the content of `package.json` on your device
- any other information that can help developers to reproduce the problem on your device for debugging

### Testing

Before a commit is made, several tests would take place automatically to ensure that UI and all of the functionalities on our website are working normally. There are:

- unit tests
- UI tests
  - It will take some time to compare current screenshots with the ground truth screenshot images
  - Note that the dev servers must be started up to host data which is required by UI tests:
  ```
  // start dev servers
  make dev
  ```

These tests can also run manually:

```
// running unit tests
make test

// running ui-tests
make ui-test
```

### Dependencies

There are three other packages developed by us and used in the `twreporter-react`:

- [`@twreporter/react-components`](https://github.com/twreporter/twreporter-react-components): presentational components
- [`@twreporter/redux`](https://github.com/twreporter/twreporter-redux): redux actions and reducers
- [`@twreporter/registration`](https://github.com/twreporter/react-redux-registration): membership related system and widgets

This repo and the dependencies above only contains the frontend code of our website.

If you're looking for our backend API system, check out [`twreporter/go-api`](https://github.com/twreporter/go-api).

If you're looking for the backstage CMS system we use, check out [`twreporte/keystone`](https://github.com/twreporter/keystone) and [`twreporter/plate`](https://github.com/twreporter/plate).

## Contact us

You can also contact us via email if you have any further questions.

developer@twreporter.org
