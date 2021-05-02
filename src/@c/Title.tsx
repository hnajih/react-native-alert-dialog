import React from 'react';
import { Text } from 'react-native';

type TitleProps = {
  children?: string;
  size?: number;
  color?: string;
  center?: boolean;
  right?: boolean;
  left?: boolean;
  bold?: boolean;
  [x: string]: any;
};

const Title = (props: TitleProps) => {
  // const {theme} = useContext(ThemeContext);

  const {
    children,
    size: fontSize = 18,
    color = 'red',
    center,
    right,
    bold,
  } = props;

  return (
    <Text
      style={[
        {
          fontSize,
          color,
        },
        { textAlign: center ? 'center' : right ? 'right' : 'left' },
        bold && { fontWeight: 'bold' },
      ]}
    >
      {children}
    </Text>
  );
};

Title.defaultProps = {
  size: 28,
  center: false,
  right: false,
  left: true,
};

export default Title;
