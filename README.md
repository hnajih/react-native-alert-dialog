# react-native-alert-dialog

react-native-alert-dialog

## Installation

```sh
npm install react-native-alert-dialog
```

## Usage

Wrap your root component in the AlertProvider, and then call the useAlert anywhere in your app

```js
import {
  AlertProvider,
  useAlert,
  themes,
  ThemeType,
} from 'react-native-alert-dialog';

// root component
<AlertProvider theme={mytheme}>
  <App />
</AlertProvider>;

// anywhere in your app
const { alert, dismiss } = useAlert();
alert({
  title: 'Hello World!',
  message: 'Laboris aliqua elit officia fugiat adipisicing.',
  type: 'success',
});
```

## Available Props

| name          |                  default                  |                                  description |
| ------------- | :---------------------------------------: | -------------------------------------------: |
| mode          |                  'modal'                  |                           'modal' or 'toast' |
| title         |                   null                    |                                    the title |
| message       |                   null                    |                                  the message |
| type          |                'primary '                 | 'primary' , 'success' , 'warning' , 'danger' |
| background    |                  'white'                  |                             background color |
| backdropColor |                  'black'                  |                               backdrop color |
| hasBackdrop   |                   true                    |                                 has backdrop |
| radius        |                    10                     |                                       radius |
| position      |                 'center'                  |                      'top','bottom','center' |
| align         |                 'center'                  |            'left','right','center','stretch' |
| color         |                   null                    |                                 dialog color |
| header        |                () => null                 |            component to render in the header |
| autoClose     |                     0                     | automatically close the dialog after a delay |
| buttons       | [[{ title: 'Done !', onPress: dismiss }]] |                            buttons to render |

# Optional: setup different headers for every dialog type

```js
const mytheme = {
  ...themes.default,
  props: {
    ...themes.default.props,
    headers: {
      success: <Icon name={'check'} size={50} color={'green'} />,
    },
  },
};

<AlertProvider theme={mytheme}></AlertProvider>;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
