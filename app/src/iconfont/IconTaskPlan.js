/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconTaskPlan = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M946.176 173.056h-118.784V148.48a90.624 90.624 0 1 0-181.248 0v24.576H377.856V148.48a90.624 90.624 0 1 0-181.248 0v24.576H77.824a38.4 38.4 0 0 0-38.4 38.4v729.6a38.4 38.4 0 0 0 38.4 38.4h870.4a38.4 38.4 0 0 0 38.4-38.4V211.456a38.4 38.4 0 0 0-40.448-38.4z m-248.832-24.576a39.424 39.424 0 1 1 78.848 0v121.344a39.424 39.424 0 0 1-78.848 0V148.48z m-449.536 0a39.424 39.424 0 1 1 78.848 0v121.344a39.424 39.424 0 0 1-78.848 0V148.48z m659.968 754.176H116.224V249.856h80.384v20.48a90.624 90.624 0 0 0 181.248 0v-20.48h268.288v20.48a90.624 90.624 0 0 0 181.248 0v-20.48h80.384v652.8z"
        fill={getIconColor(color, 0, '#1F88D9')}
      />
      <Path
        d="M662.528 446.464l-196.608 204.8-102.4-106.496a38.4 38.4 0 1 0-56.32 51.2l132.096 134.656a38.4 38.4 0 0 0 27.136 11.264 38.4 38.4 0 0 0 27.648-11.776L716.8 499.712a38.4 38.4 0 0 0-54.272-53.248z"
        fill={getIconColor(color, 1, '#1F88D9')}
      />
    </Svg>
  );
};

IconTaskPlan.defaultProps = {
  size: 18,
};

IconTaskPlan = React.memo ? React.memo(IconTaskPlan) : IconTaskPlan;

export default IconTaskPlan;
