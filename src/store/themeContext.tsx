import React, { createContext, Dispatch, useReducer } from 'react';

export interface IThemeConfig {
    color?: string;
    primaryColor?: string;
}

interface IInitialState {
    themeConfig: IThemeConfig,
    dispatch: Dispatch<{ type: EThemeActionType, payload: Partial<IThemeConfig> }>
}

const initialState: IInitialState = {
    themeConfig: {
        // color: 'rgba(0,0,0,.85)',
        // primaryColor: '#1890ff',
    },
    dispatch: (() => {}) as Dispatch<{ type: EThemeActionType, payload: Partial<IThemeConfig> }>
};

export const themeContext = createContext<{
    themeConfig: IThemeConfig,
    dispatch: Dispatch<any>
}>(initialState);

export enum EThemeActionType {
    MODIFY = 'MODIFY',
    SET = 'SET',
    DELETE = 'DELETE',
    RESET = 'RESET',
}

const themeReducer = (state: IThemeConfig, action: { type: EThemeActionType, payload: any }) => {
    switch(action.type) {
        case EThemeActionType.DELETE: {
            return { ...initialState.themeConfig };
        }
        case EThemeActionType.MODIFY: {
            return { ...state, ...action.payload };
        }
        case EThemeActionType.RESET: {
            return initialState.themeConfig;
        }
        case EThemeActionType.SET: {
            return { ...action.payload };
        }
    }
};

export const themeReducerWrapper = function(Component: React.FC) {
  return function WrapperComponent(props: any) {
      const [state, dispatch] = useReducer(themeReducer, initialState.themeConfig)
      return (
          <themeContext.Provider value={{ themeConfig: state, dispatch }}>
            <Component {...props} />
          </themeContext.Provider>
      );
    }
}
