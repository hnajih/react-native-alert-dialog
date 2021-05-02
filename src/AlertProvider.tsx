import React, { useState, useContext } from 'react';

import { themes, ThemeType } from './alert-theme-context';
import Alert, { AlertProps } from './Alert';

export const ThemeContext = React.createContext<any>({});

export const useAlert = () => useContext(ThemeContext);

export default function AlertProvider({
  children,
  theme = themes.default,
}: {
  children: React.ReactNode;
  theme?: ThemeType;
}) {
  const [a, seta] = useState<AlertProps>();

  const alert = (al: AlertProps) => {
    seta(al);
  };

  const dismiss = () => {
    alert({});
  };

  const isVisible = typeof a === 'object' && Object.keys(a).length > 0;

  const AlertComponent = (
    <Alert
      {...a}
      isVisible={isVisible}
      onDismiss={() => {
        dismiss();
        a?.onDismiss !== undefined && a?.onDismiss();
      }}
    />
  );

  return (
    <ThemeContext.Provider value={{ theme, alert, dismiss }}>
      {children}
      {AlertComponent}
    </ThemeContext.Provider>
  );
}
