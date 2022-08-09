/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconChacha = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M851.421867 217.838933l-45.2608-45.2608L512 466.7392 217.838933 172.578133 172.578133 217.838933 466.7392 512l-294.161067 294.161067 45.2608 45.2608L512 557.2608l294.161067 294.161067 45.2608-45.2608L557.2608 512z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconChacha.defaultProps = {
  size: 18,
};

IconChacha = React.memo ? React.memo(IconChacha) : IconChacha;

export default IconChacha;
