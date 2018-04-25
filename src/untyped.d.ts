declare namespace ReactRouterTransition {

  namespace RouteTransition {
    interface Props {
      className?: string;
      wrapperComponent?: boolean|JSX.Element|string;
      atEnter: React.CSSProperties;
      atActive: React.CSSProperties;
      atLeave: React.CSSProperties;
      didLeave?: (...args: any[]) => void;
      mapStyles?: (...args: any[]) => void;
      runOnMount?: boolean;
    }
  }

  class RouteTransition extends React.Component<RouteTransition.Props> {}


  namespace AnimatedRoute {
    interface Props extends RouteTransition.Props {
      component: React.ReactNode;
      path: string;
      exact?: boolean;
    }
  }
  class AnimatedRoute extends React.SFC<AnimatedRoute.Props> {}

  namespace AnimatedSwitch {
    interface Props extends RouteTransition.Props {
      location?: {
        key?: string;
        pathname?: string;
      }
    }
  }
  class AnimatedSwitch extends React.Component<AnimatedSwitch.Props> {}

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

  function spring(val: number, config?: SpringHelperConfig): OpaqueConfig;
}

declare module "react-router-transition" {
  export = ReactRouterTransition;
}
