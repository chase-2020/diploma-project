/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconPeixun = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M1024 102.4h-460.8V0H460.8v102.4H0v710.144h298.496L204.8 972.8l88.576 51.2 122.88-211.456h190.976L730.624 1024 819.2 972.8l-93.696-160.768H1024z m-204.8 506.88H204.8v-102.4h614.4z m0-204.8H204.8V307.2h614.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconPeixun.defaultProps = {
  size: 18,
};

IconPeixun = React.memo ? React.memo(IconPeixun) : IconPeixun;

export default IconPeixun;
