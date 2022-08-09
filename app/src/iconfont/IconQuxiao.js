/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconQuxiao = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M510.65 963C264.6 963 63.3 761.26 63.3 514.7S264.6 66.41 510.65 66.41 958 268.14 958 514.7 756.69 963 510.65 963zM655 858.61a377.28 377.28 0 0 0 198.65-199.12 371.82 371.82 0 0 0 0-289.58A377.18 377.18 0 0 0 655 170.79a369.15 369.15 0 0 0-288.64 0 377.09 377.09 0 0 0-198.71 199.12 371.82 371.82 0 0 0 0 289.58A377.12 377.12 0 0 0 366.33 858.6a369.21 369.21 0 0 0 288.64 0z"
        fill={getIconColor(color, 0, '#bfbfbf')}
      />
      <Path
        d="M287.806909 685.824011m26.516505-26.516504l349.31075-349.31075q26.516504-26.516504 53.033008 0l0 0q26.516504 26.516504 0 53.033008l-349.31075 349.31075q-26.516504 26.516504-53.033008 0l0 0q-26.516504-26.516504 0-53.033008Z"
        fill={getIconColor(color, 1, '#bfbfbf')}
      />
      <Path
        d="M686.881618 742.132969m-26.516505-26.516504l-349.31075-349.31075q-26.516504-26.516504 0-53.033008l0 0q26.516504-26.516504 53.033009 0l349.31075 349.310749q26.516504 26.516504 0 53.033009l0 0q-26.516504 26.516504-53.033009 0Z"
        fill={getIconColor(color, 2, '#bfbfbf')}
      />
    </Svg>
  );
};

IconQuxiao.defaultProps = {
  size: 18,
};

IconQuxiao = React.memo ? React.memo(IconQuxiao) : IconQuxiao;

export default IconQuxiao;
