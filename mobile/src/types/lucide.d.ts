import 'lucide-react-native';

declare module 'lucide-react-native' {
  import { SvgProps } from 'react-native-svg';
  import { ForwardRefExoticComponent, RefAttributes } from 'react';

  /**
   * Overriding the broken LucideProps from version 1.8.0
   * which accidentally omitted color and used web types.
   */
  export interface LucideProps extends SvgProps {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
    color?: string;
    stroke?: string;
    opacity?: number;
  }

  // We don't need to redeclare every icon because they all use LucideProps 
  // which we have now merged with the correct properties.
}
