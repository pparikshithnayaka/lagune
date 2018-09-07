declare module 'react-router-transition' {
  import * as React from 'react';

  interface RouteTransitionProps {
    className?: string;
    wrapperComponent?: boolean|JSX.Element|string;
    atEnter: React.CSSProperties;
    atActive: React.CSSProperties;
    atLeave: React.CSSProperties;
    didLeave?: (...args: any[]) => void;
    mapStyles?: (...args: any[]) => void;
    runOnMount?: boolean;
  }

  export class RouteTransition extends React.Component<RouteTransitionProps> {}


  interface AnimatedRouteProps extends RouteTransitionProps {
    component: React.ReactNode;
    path: string;
    exact?: boolean;
  }

  export class AnimatedRoute extends React.SFC<AnimatedRouteProps> {}


  interface AnimatedSwitchProps extends RouteTransitionProps {
    location?: {
      key?: string;
      pathname?: string;
    };
  }

  export class AnimatedSwitch extends React.Component<AnimatedSwitchProps> {}


  interface SpringHelperConfig {
    stiffness?: number;
    damping?: number;
    precision?: number;
  }

  interface OpaqueConfig {
    val: number;
    stiffness: number;
    damping: number;
    precision: number;
  }

  export function spring (val: number, config?: SpringHelperConfig): OpaqueConfig;
}
