/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconShouye = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M488.576 61.312a32.704 32.704 0 0 1 45.504 0 32.064 32.064 0 0 1 0 45.568L80.64 559.68a32.704 32.704 0 0 1-45.568 0 32.064 32.064 0 0 1 0-45.504L488.576 61.312z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M489.216 60.672a32.064 32.064 0 0 1 45.504 0l453.504 453.504a32.192 32.192 0 1 1-45.568 45.504L489.216 106.24a32.704 32.704 0 0 1 0-45.568zM704 165.888a31.424 31.424 0 0 1 32.064-32.064h128.256c17.728 0 32.064 14.336 32.064 32a31.424 31.424 0 0 1-32 32.128h-128.32a32.064 32.064 0 0 1-32.064-32.064z"
        fill={getIconColor(color, 1, '#000000')}
      />
      <Path
        d="M832.32 165.248c0-17.728 14.4-32.064 32.064-32.064a31.424 31.424 0 0 1 32.064 32v128.32a32.064 32.064 0 0 1-32 32.064 31.424 31.424 0 0 1-32.128-32V165.184zM126.784 550.72a32.064 32.064 0 1 1 64.192 0v384.832a32.064 32.064 0 1 1-64.192 0V550.72z"
        fill={getIconColor(color, 2, '#000000')}
      />
      <Path
        d="M126.784 935.552a31.424 31.424 0 0 1 32.064-32.064h256.64c17.664 0 32 14.336 32 32a31.424 31.424 0 0 1-32 32.128h-256.64a32.064 32.064 0 0 1-32-32.064z m449.024 0a31.424 31.424 0 0 1 32-32.064h256.64c17.664 0 32 14.336 32 32a31.424 31.424 0 0 1-32 32.128h-256.64a32.064 32.064 0 0 1-32-32.064z"
        fill={getIconColor(color, 3, '#000000')}
      />
      <Path
        d="M383.36 742.464a32.064 32.064 0 0 1 32.064-31.36 31.424 31.424 0 0 1 32.064 31.36v192.448a32.064 32.064 0 0 1-32 31.36 31.424 31.424 0 0 1-32.128-31.36V742.4z"
        fill={getIconColor(color, 4, '#000000')}
      />
      <Path
        d="M383.36 743.104a31.424 31.424 0 0 1 31.424-32h192.448a32.064 32.064 0 0 1 31.36 32 31.424 31.424 0 0 1-31.36 32.064H414.72a32.064 32.064 0 0 1-31.424-32z"
        fill={getIconColor(color, 5, '#000000')}
      />
      <Path
        d="M575.808 742.464a32.064 32.064 0 0 1 32-31.36 31.424 31.424 0 0 1 32.128 31.36v192.448a32.064 32.064 0 0 1-32.064 31.36 31.424 31.424 0 0 1-32.064-31.36V742.4z m288.64-223.808a32.704 32.704 0 0 0-32.128 32v384.896a32.064 32.064 0 1 0 64.128 0V550.72a32.704 32.704 0 0 0-32-32.064z"
        fill={getIconColor(color, 6, '#000000')}
      />
    </Svg>
  );
};

IconShouye.defaultProps = {
  size: 18,
};

IconShouye = React.memo ? React.memo(IconShouye) : IconShouye;

export default IconShouye;
