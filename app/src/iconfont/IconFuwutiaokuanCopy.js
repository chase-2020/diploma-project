/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconFuwutiaokuanCopy = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M703.664 324.48H301.008a36.944 36.944 0 1 1 0-73.888h402.656a36.576 36.576 0 0 1 36.944 36.944 37.04 37.04 0 0 1-36.944 36.944z"
        fill={getIconColor(color, 0, '#8a8a8a')}
      />
      <Path
        d="M703.664 513.744H301.008a36.944 36.944 0 1 1 0-73.888h402.656a36.576 36.576 0 0 1 36.944 36.944 37.04 37.04 0 0 1-36.944 36.944z"
        fill={getIconColor(color, 1, '#8a8a8a')}
      />
      <Path
        d="M703.664 702.256H301.008a36.944 36.944 0 1 1 0-73.888h402.656a36.576 36.576 0 0 1 36.944 36.944 37.04 37.04 0 0 1-36.944 36.944z"
        fill={getIconColor(color, 2, '#8a8a8a')}
      />
      <Path
        d="M705.776 992H116.416a36.208 36.208 0 0 1-36.432-36.704V68.704A36.208 36.208 0 0 1 116.416 32h791.152a36.208 36.208 0 0 1 36.416 36.704V936.96a36.432 36.432 0 1 1-72.848 0V105.392H152.832v813.216H705.76a36.208 36.208 0 0 1 36.432 36.704A36.672 36.672 0 0 1 705.776 992z"
        fill={getIconColor(color, 3, '#8a8a8a')}
      />
    </Svg>
  );
};

IconFuwutiaokuanCopy.defaultProps = {
  size: 18,
};

IconFuwutiaokuanCopy = React.memo ? React.memo(IconFuwutiaokuanCopy) : IconFuwutiaokuanCopy;

export default IconFuwutiaokuanCopy;
