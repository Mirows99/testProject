/// <reference types="next" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module '@repo/ui' {
  export const Card: React.FC<any>;
  export const Gradient: React.FC<any>;
  export const TurborepoLogo: React.FC<any>;
  // Add any other components you need from the UI package
} 