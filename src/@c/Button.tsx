import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from './../AlertProvider';

export type ButtonType = {
  title?: string;
  bg?: string;
  color?: string;
  radius?: number;
  fontSize?: number;
  type?: 'contained' | 'outlined';
  onPress?: () => void;
};

// const defaultProps = {
//   title: 'ok',
// };

// Button.defaultProps = defaultProps;

function Button(props: ButtonType) {
  const { theme } = useContext(ThemeContext);
  const {
    title = 'Done !',
    bg = theme?.colors.primary,
    color = theme?.button.text,
    radius = theme?.button.radius,
    fontSize = theme?.button.fontSize,
    type = 'contained',
    onPress,
  } = props;

  const outlined = type == 'outlined';

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          {
            paddingVertical: 10,
            paddingHorizontal: 12,
            backgroundColor: outlined ? 'white' : bg,
            borderWidth: 1,
            borderColor: bg,
            borderRadius: radius,
          },
        ]}
      >
        <Text
          style={{
            color: outlined ? bg : color,
            fontSize,
            textAlign: 'center',
            fontWeight: '500',
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default Button;
