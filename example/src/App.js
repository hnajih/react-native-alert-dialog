import React, { useState } from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import Alert, {
  AlertProvider,
  useAlert,
  themes,
  ThemeType,
} from 'react-native-alert-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Screen() {
  const [alertVisible, setalertVisible] = useState(true);

  const _dismiss = () => setalertVisible(false);

  return (
    <View style={styles.container}>
      {/* <Alert isVisible message={'eeee'} /> */}
      <View style={{ flex: 1 }}></View>
      <Button title={'show'} onPress={() => setalertVisible(true)} />
      <View style={{ flex: 1 }}></View>
      <Alert
        isVisible={alertVisible}
        type={'success'}
        title={'Amet occaecat'}
        buttons={[
          // { title: 'cancel ', type: 'outlined', onPress: _dismiss },
          { title: 'Done !', onPress: _dismiss },
        ]}
      >
        {/* <Alert.Header source={{ uri: 'https://picsum.photos/200' }} /> */}
        {/* <Alert.Title center>eeee</Alert.Title> */}
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          Labore eu ullamco cillum reprehenderit Lorem in sint .
        </Text>

        {/* <Alert.Actions>
          <Alert.Button title={'cancel'} type={'outlined'} onPress={_dismiss} />
          <Alert.Button onPress={() => console.warn('ok')} />
        </Alert.Actions> */}
      </Alert>
    </View>
  );
}

function Screen2() {
  const { alert, dismiss } = useAlert();

  const show = () =>
    alert({
      title: 'eeeee',
      message:
        'Enim excepteur occaecat ea labore culpa duis dolor cupidatat incididunt id cillum.',
      type: 'success',
      // mode: 'toast',
      // position: 'top',
      // align: 'left',
      // header: (
      //   <View
      //     style={{
      //       width: 50,
      //       height: 50,
      //       // borderRadius: 80,
      //       justifyContent: 'center',
      //       alignItems: 'center',
      //     }}
      //   >
      //     <Icon name={'check'} size={35} />
      //   </View>
      // ),
      // buttons: [
      //   { title: 'cancel ', type: 'outlined', onPress: dismiss },
      //   { title: 'Done !', onPress: dismiss },
      // ],
      autoClose: 0,
      // onDismiss: () => console.warn('ee')
    });

  return (
    <View>
      <Button title={'show'} onPress={show} />
      <Button title={'dismiss'} onPress={dismiss} />
    </View>
  );
}

export default function App() {
  const mytheme = {
    ...themes.default,
    props: {
      ...themes.default.props,
      headers: {
        success: <Icon name={'check'} size={50} color={'green'} />,
      },
    },
  };
  return (
    <AlertProvider theme={mytheme}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Screen2 />
      </View>
    </AlertProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
