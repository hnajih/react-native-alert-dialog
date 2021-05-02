import React from 'react';
import { View, SafeAreaView, Text, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { ThemeContext } from './AlertProvider';
import Button from './@c/Button';
import Title from './@c/Title';

const { width } = Dimensions.get('screen');

export type AlertProps = {
  children?: React.ReactNode;
  title?: string;
  message?: string;
  type?: 'primary' | 'success' | 'warning' | 'danger';
  mode?: 'modal' | 'toast';
  isVisible?: boolean;
  onDismiss?: () => void;
  background?: string;
  opacity?: number;
  backdropColor?: string;
  hasBackdrop?: boolean;
  radius?: number;
  position?: 'top' | 'bottom' | 'center';
  align?: 'left' | 'right' | 'center' | 'stretch';
  color?: string;
  borderWidth?: number;
  header?: React.ReactNode;
  autoClose?: number;
  buttons?: {
    title: string;
    onPress: () => void;
  }[];
  animation?: string;
};

type AlertState = {
  iconHeight: number;
  isVisible?: boolean;
};

let timer: ReturnType<typeof setTimeout>;

class Alert extends React.Component<AlertProps, AlertState> {
  state: AlertState = {
    iconHeight: 0,
    isVisible: this.props.isVisible,
  };

  constructor(props: AlertProps) {
    super(props);
  }

  componentDidUpdate(prevProps: AlertProps) {
    const { isVisible, autoClose, onDismiss } = this.props;
    if (autoClose !== undefined && autoClose > 0) {
      if (isVisible !== prevProps.isVisible) {
        if (isVisible) {
          timer = setTimeout(() => {
            onDismiss !== undefined && onDismiss();
          }, autoClose);
        } else {
          clearTimeout(timer);
        }
      }
    }
  }

  static contextType = ThemeContext;
  static defaultProps = {
    mode: 'modal',
    background: 'white',
    opacity: 0.5,
    type: 'primary',
    radius: 10,
    position: 'center',
    align: 'center',
    isVisible: false,
    autoClose: 0,
  };

  getDefaultColor(type: AlertProps['type']) {
    const color =
      type == 'primary'
        ? this.context.theme.colors.primary
        : type == 'success'
        ? this.context.theme.colors.success
        : type == 'warning'
        ? this.context.theme.colors.warning
        : this.context.theme.colors.danger;

    return color;
  }

  render() {
    const {
      children,
      title,
      message,
      background: backgroundColor,
      isVisible,
      onDismiss,
      type,
      mode,
      buttons = [{ title: 'Done !', onPress: onDismiss }],
      radius,
      backdropColor = this.context.theme.props.backdropColor,
      hasBackdrop = this.context.theme.props.hasBackdrop,
      position,
      align,
      color = this.getDefaultColor(type),
      borderWidth = this.context.theme.props.borderWidth,
      header = this.context.theme.props.headers[`${this.props.type}`],
      animation = this.props.mode == 'modal'
        ? 'tada'
        : position == 'bottom'
        ? 'bounceInUp'
        : 'bounceInDown',
    } = this.props;

    if (!isVisible) {
      return null;
    }

    const headerComponent = (
      <View
        style={{
          marginTop: (-1 * this.state.iconHeight) / 2,
          alignSelf: 'center',
          position: 'absolute',
        }}
        onLayout={(event: any) => {
          const { height } = event.nativeEvent.layout;
          this.setState({ iconHeight: height });
        }}
      >
        {header}
      </View>
    );

    if (mode == 'toast') {
      return (
        <SafeAreaView
          style={[
            { position: 'absolute' },
            position === 'top' ? { top: 0 } : { bottom: 0 },
            { left: 0, right: 0 },
          ]}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <Animatable.View
              animation={animation}
              duration={1000}
              style={{
                backgroundColor,
                padding: 10,
                borderTopWidth: position == 'bottom' ? 2 : 0,
                borderBottomWidth: position == 'top' ? 2 : 0,
                borderColor: color,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ padding: 5 }}>{header}</View>
                <View style={{ flex: 1 }}>
                  <View style={{ marginVertical: 2 }}>
                    {title && <Title color={color}>{title}</Title>}
                  </View>
                  {message && (
                    <View style={{ paddingVertical: 5 }}>
                      <Text>{message}</Text>
                    </View>
                  )}
                </View>
              </View>
            </Animatable.View>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <View
        style={[
          {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
          {
            justifyContent:
              position == 'top'
                ? 'flex-start'
                : position == 'bottom'
                ? 'flex-end'
                : 'center',
          },
          hasBackdrop && {
            backgroundColor: backdropColor,
          },
        ]}
      >
        <Animatable.View
          animation={animation}
          duration={1000}
          style={[
            {
              width: (2 * width) / 3,
              backgroundColor,
              padding: 10,
              borderRadius: radius,
              //   alignItems: 'center',
              alignSelf:
                align == 'center'
                  ? 'center'
                  : align == 'left'
                  ? 'flex-start'
                  : align == 'right'
                  ? 'flex-end'
                  : 'stretch',
              borderWidth,
              borderColor: color,
            },
          ]}
        >
          {/* <Header source={{ uri: 'https://picsum.photos/200' }} /> */}
          {header && headerComponent}
          <View style={{ marginVertical: 10 }}>
            {title && (
              <Title center color={color}>
                {title}
              </Title>
            )}
          </View>
          {message && (
            <View style={{ paddingVertical: 5 }}>
              <Text>{message}</Text>
            </View>
          )}
          {/* <Text
            style={{ fontSize: 20, marginVertical: 10, textAlign: 'center' }}
          >
            {title}
          </Text>
          <Text style={{ fontSize: 15, textAlign: 'center' }}>{message}</Text> */}
          {children}
          {/* <Actions> */}
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}
          >
            {buttons?.map((props, i) => (
              <View style={{ flex: 1, padding: 2 }} key={i}>
                <Button bg={color} {...props} />
              </View>
            ))}
          </View>

          {/* </Actions> */}
        </Animatable.View>
      </View>
    );
  }
}

export default Alert;
