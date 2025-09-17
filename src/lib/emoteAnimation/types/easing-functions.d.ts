declare module 'easing-functions' {
  export type EasingFunc = (k: number) => number;

  export interface EasingGroup {
    In: EasingFunc;
    Out: EasingFunc;
    InOut: EasingFunc;
  }

  export interface EasingNamespace {
    Quadratic: EasingGroup;
    Cubic: EasingGroup;
    Quartic: EasingGroup;
    Quintic: EasingGroup;
    Sinusoidal: EasingGroup;
    Exponential: EasingGroup;
    Circular: EasingGroup;
    Elastic: EasingGroup;
    Back: EasingGroup;
    Bounce: EasingGroup;
    Linear: EasingFunc;
    Constant: EasingFunc;
  }

  export type Interpolation = keyof EasingNamespace;
  export type EasingMode = keyof EasingGroup;

  const Easing: EasingNamespace;
  export = Easing;
}

declare global {
  interface Window {
    Easing?: import('easing-functions').EasingNamespace;
  }
}