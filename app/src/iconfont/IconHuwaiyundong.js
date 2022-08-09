/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconHuwaiyundong = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M511.87 33.99c-265.1 0-480 214.9-480 480s214.9 480 480 480 480-214.9 480-480-214.91-480-480-480z m-400 480c0-54.04 10.57-106.41 31.4-155.67a397.984 397.984 0 0 1 49.83-86.01c94.83 40.2 158.49 134.15 158.49 239.45 0 107.02-63.78 200.82-161.04 240.55-18.97-25.5-34.8-53.14-47.27-82.64-20.85-49.27-31.41-101.65-31.41-155.68z m400 400c-54.03 0-106.41-10.57-155.67-31.4-39.91-16.88-76.41-39.9-108.83-68.55a339.525 339.525 0 0 0 39.74-24.09 341.395 341.395 0 0 0 76.27-73.87c44.63-59.28 68.22-129.93 68.22-204.32 0-38.4-6.36-76.09-18.91-112.05-12.13-34.75-29.77-67.17-52.44-96.36a340.718 340.718 0 0 0-79.51-74.16 341.395 341.395 0 0 0-30.19-18.06c31.62-27.35 67.05-49.41 105.65-65.74 49.26-20.84 101.64-31.4 155.67-31.4s106.41 10.57 155.67 31.4c38.96 16.48 74.68 38.8 106.52 66.5a338.838 338.838 0 0 0-36.49 22.62 341.232 341.232 0 0 0-75.59 73.8c-44.2 59.11-67.57 129.46-67.57 203.45 0 39.65 6.77 78.5 20.13 115.49 12.91 35.74 31.63 68.88 55.66 98.52 29.44 36.31 66.08 66.04 107.08 87.47-32.64 29.02-69.45 52.32-109.74 69.36-49.26 20.82-101.64 31.39-155.67 31.39z m321.9-162.49c-94.52-39.97-159.36-134.53-159.36-239.75 0-105.23 61.96-198.01 156.76-238.75a397.636 397.636 0 0 1 49.29 85.31c20.84 49.26 31.4 101.64 31.4 155.67 0 54.03-10.57 106.41-31.4 155.67a397.338 397.338 0 0 1-46.69 81.85z"
        fill={getIconColor(color, 0, '#7F7F7F')}
      />
    </Svg>
  );
};

IconHuwaiyundong.defaultProps = {
  size: 18,
};

IconHuwaiyundong = React.memo ? React.memo(IconHuwaiyundong) : IconHuwaiyundong;

export default IconHuwaiyundong;