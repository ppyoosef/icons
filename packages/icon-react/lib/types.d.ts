import { FunctionComponent } from "react";

export interface IconProps {
    name: string;
    size?: string | number;
    color?: string;
  }

export type Icon = FunctionComponent<IconProps>;