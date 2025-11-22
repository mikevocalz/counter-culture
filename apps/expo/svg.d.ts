/// <reference types="react" />
/// <reference types="react-native" />

declare module 'react-native-svg' {
  import { Component, ReactNode } from 'react';
  import { GestureResponderEvent } from 'react-native';

  export type NumberProp = string | number;

  export interface SvgProps {
    width?: NumberProp;
    height?: NumberProp;
    viewBox?: string;
    preserveAspectRatio?: string;
    color?: string;
    title?: string;
    id?: string;
    xmlns?: string;
    fill?: string;
    fillOpacity?: NumberProp;
    fillRule?: 'nonzero' | 'evenodd';
    stroke?: string;
    strokeWidth?: NumberProp;
    strokeOpacity?: NumberProp;
    strokeLinecap?: 'butt' | 'square' | 'round';
    strokeLinejoin?: 'miter' | 'bevel' | 'round';
    strokeDasharray?: string | number[];
    strokeDashoffset?: NumberProp;
    opacity?: NumberProp;
    transform?: string | object;
    style?: object;
    onPress?: (event: GestureResponderEvent) => void;
    onPressIn?: (event: GestureResponderEvent) => void;
    onPressOut?: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
    children?: ReactNode;
    testID?: string;
    accessible?: boolean;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    accessibilityRole?: string;
  }

  export interface PathProps extends SvgProps {
    d?: string;
    className?: string;
  }

  export interface GProps extends SvgProps {
    className?: string;
    'data-name'?: string;
  }

  export interface DefsProps extends SvgProps {}

  export interface CircleProps extends SvgProps {
    cx?: number | string;
    cy?: number | string;
    r?: number | string;
    className?: string;
  }

  export interface RectProps extends SvgProps {
    x?: number | string;
    y?: number | string;
    rx?: number | string;
    ry?: number | string;
    className?: string;
  }

  export interface LineProps extends SvgProps {
    x1?: number | string;
    y1?: number | string;
    x2?: number | string;
    y2?: number | string;
    className?: string;
  }

  export interface PolygonProps extends SvgProps {
    points?: string;
    className?: string;
  }

  export interface PolylineProps extends SvgProps {
    points?: string;
    className?: string;
  }

  export interface EllipseProps extends SvgProps {
    cx?: number | string;
    cy?: number | string;
    rx?: number | string;
    ry?: number | string;
    className?: string;
  }

  export interface TextProps extends SvgProps {
    x?: number | string;
    y?: number | string;
    dx?: number | string;
    dy?: number | string;
    rotate?: number | string;
    textAnchor?: 'start' | 'middle' | 'end';
    className?: string;
  }

  export interface TSpanProps extends TextProps {}

  export interface ImageProps extends SvgProps {
    x?: number | string;
    y?: number | string;
    href?: string;
    xlinkHref?: string;
    preserveAspectRatio?: string;
    className?: string;
  }

  export interface LinearGradientProps extends SvgProps {
    x1?: number | string;
    y1?: number | string;
    x2?: number | string;
    y2?: number | string;
    gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    className?: string;
  }

  export interface RadialGradientProps extends SvgProps {
    cx?: number | string;
    cy?: number | string;
    r?: number | string;
    fx?: number | string;
    fy?: number | string;
    gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    className?: string;
  }

  export interface StopProps extends SvgProps {
    offset?: number | string;
    stopColor?: string;
    stopOpacity?: number | string;
    className?: string;
  }

  export interface ClipPathProps extends SvgProps {
    clipPathUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    className?: string;
  }

  export interface MaskProps extends SvgProps {
    maskUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    maskContentUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    className?: string;
  }

  export interface UseProps extends SvgProps {
    href?: string;
    xlinkHref?: string;
    x?: number | string;
    y?: number | string;
    className?: string;
  }

  export interface SymbolProps extends SvgProps {
    viewBox?: string;
    preserveAspectRatio?: string;
    className?: string;
  }

  export default class Svg extends Component<SvgProps> {}
  export class Path extends Component<PathProps> {}
  export class G extends Component<GProps> {}
  export class Defs extends Component<DefsProps> {}
  export class Circle extends Component<CircleProps> {}
  export class Rect extends Component<RectProps> {}
  export class Line extends Component<LineProps> {}
  export class Polygon extends Component<PolygonProps> {}
  export class Polyline extends Component<PolylineProps> {}
  export class Ellipse extends Component<EllipseProps> {}
  export class Text extends Component<TextProps> {}
  export class TSpan extends Component<TSpanProps> {}
  export class Image extends Component<ImageProps> {}
  export class LinearGradient extends Component<LinearGradientProps> {}
  export class RadialGradient extends Component<RadialGradientProps> {}
  export class Stop extends Component<StopProps> {}
  export class ClipPath extends Component<ClipPathProps> {}
  export class Mask extends Component<MaskProps> {}
  export class Use extends Component<UseProps> {}
  export class Symbol extends Component<SymbolProps> {}
}
