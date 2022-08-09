/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconLiuliangyunpingtaitubiao02 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M229.12 563.2l0 301.696 178.56 0L407.68 711.68c0-32.896 26.624-59.52 59.52-59.52l90.368 0c32.896 0 59.52 26.624 59.52 59.52l0 153.088 178.56 0L795.648 563.2 512.256 262.016 229.12 563.2z"
        fill={getIconColor(color, 0, '#8a8a8a')}
      />
      <Path
        d="M555.776 160.896c-11.776-11.776-27.392-18.176-44.032-18.176-16.64 0-32.256 6.528-44.544 18.816L77.184 575.36l72.832 0L505.344 198.4c2.304-2.304 5.12-2.688 6.528-2.688 1.408 0 4.096 0.384 6.016 2.176l356.096 377.472 72.832 0L555.776 160.896z"
        fill={getIconColor(color, 1, '#8a8a8a')}
      />
    </Svg>
  );
};

IconLiuliangyunpingtaitubiao02.defaultProps = {
  size: 18,
};

IconLiuliangyunpingtaitubiao02 = React.memo ? React.memo(IconLiuliangyunpingtaitubiao02) : IconLiuliangyunpingtaitubiao02;

export default IconLiuliangyunpingtaitubiao02;
