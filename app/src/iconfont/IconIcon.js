/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconIcon = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M793.6 307.2h-153.6v-51.2c0-28.16-23.04-51.2-51.2-51.2h-230.4V179.2c0-28.16-23.04-51.2-51.2-51.2h-51.2c-28.16 0-51.2 23.04-51.2 51.2v716.8c0 28.16 23.04 51.2 51.2 51.2h51.2c28.16 0 51.2-23.04 51.2-51.2v-230.4h230.4v25.6c0 28.16 23.04 51.2 51.2 51.2h153.6c28.16 0 51.2-23.04 51.2-51.2V358.4c0-28.16-23.04-51.2-51.2-51.2zM307.2 870.4c0 15.36-10.24 25.6-25.6 25.6s-25.6-10.24-25.6-25.6V204.8c0-15.36 10.24-25.6 25.6-25.6s25.6 10.24 25.6 25.6v665.6z m281.6-281.6c0 15.36-10.24 25.6-25.6 25.6h-204.8V256h204.8c15.36 0 25.6 10.24 25.6 25.6v307.2z m204.8 76.8c0 15.36-10.24 25.6-25.6 25.6h-128V358.4h128c15.36 0 25.6 10.24 25.6 25.6v281.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconIcon.defaultProps = {
  size: 18,
};

IconIcon = React.memo ? React.memo(IconIcon) : IconIcon;

export default IconIcon;
