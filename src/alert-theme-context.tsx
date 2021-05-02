export type ThemeType = {
  button: {
    radius: number;
    bg: string;
    text: string;
    fontSize: number;
  };
  colors: {
    primary: string;
    text: string;
    success: string;
    warning: string;
    danger: string;
  };
  props: {
    backdropColor: string;
    hasBackdrop: boolean;
    radius: number;
    position: string;
    align: string;
    borderWidth: 2;
    headers?: {
      default?: React.ReactChild;
      primary?: React.ReactChild;
      success?: React.ReactChild;
      warning?: React.ReactChild;
      danger?: React.ReactChild;
    };
  };
  sizes: object;
};

const defaultTheme: ThemeType = {
  button: {
    radius: 5,
    bg: 'purple',
    text: 'white',
    fontSize: 18,
  },
  colors: {
    primary: 'blue',
    text: 'white',
    success: 'green',
    warning: 'gold',
    danger: 'red',
  },
  props: {
    backdropColor: '#0009',
    hasBackdrop: true,
    radius: 10,
    position: 'center',
    align: 'center',
    borderWidth: 2,
    headers: {},
  },
  sizes: {},
};

export const themes = {
  default: defaultTheme,
};
