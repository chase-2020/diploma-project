/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconDingchang = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1121 1024" width={size} height={size} {...rest}>
      <Path
        d="M999.619048 1024H121.904762c-80.188952 0-121.904762-41.71581-121.904762-121.904762V268.190476c0-80.188952 41.71581-121.904762 121.904762-121.904762h121.904762V48.761905c0-22.016 14.531048-48.761905 36.571428-48.761905S316.952381 26.745905 316.952381 48.761905v97.523809h487.619048V48.761905c0-22.016 14.531048-48.761905 36.571428-48.761905S877.714286 26.745905 877.714286 48.761905v97.523809h121.904762c80.188952 0 121.904762 41.71581 121.904762 121.904762v633.904762c0 59.440762-41.71581 121.904762-121.904762 121.904762z m48.761904-731.428571c0-40.17981-32.938667-73.142857-73.142857-73.142858h-97.523809v73.142858c0 22.016-14.531048 48.761905-36.571429 48.761904S804.571429 314.587429 804.571429 292.571429V219.428571H316.952381v73.142858c0 22.016-14.531048 48.761905-36.571429 48.761904S243.809524 314.587429 243.809524 292.571429V219.428571H146.285714a73.386667 73.386667 0 0 0-73.142857 73.142858v585.142857c0 40.20419 32.938667 73.142857 73.142857 73.142857h828.952381c40.20419 0 73.142857-32.938667 73.142857-73.142857V292.571429zM555.008 838.265905a38.814476 38.814476 0 0 1-50.907429-1.121524c-58.197333-52.833524-248.32-197.607619-248.32-197.607619-20.772571-20.772571-27.355429-47.88419-11.751619-63.488 15.579429-15.579429 42.691048-8.996571 63.463619 11.776l226.840381 178.054095 239.689143-288.475428c25.965714-25.941333 57.295238-36.742095 72.899048-21.162667 15.579429 15.579429 4.778667 46.933333-21.162667 72.874667 0 0-197.095619 247.491048-270.750476 309.150476z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconDingchang.defaultProps = {
  size: 18,
};

IconDingchang = React.memo ? React.memo(IconDingchang) : IconDingchang;

export default IconDingchang;
