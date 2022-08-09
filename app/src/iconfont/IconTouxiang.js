/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconTouxiang = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 523.848232m-355.639035 0a355.639035 355.639035 0 1 0 711.27807 0 355.639035 355.639035 0 1 0-711.27807 0Z"
        fill={getIconColor(color, 0, '#ffffff')}
      />
      <Path
        d="M512 407.905761m-161.35608 0a161.35608 161.35608 0 1 0 322.71216 0 161.35608 161.35608 0 1 0-322.71216 0Z"
        fill={getIconColor(color, 1, '#515151')}
      />
      <Path
        d="M512 121.318097c-222.311048 0-402.530135 180.218786-402.530135 402.530135s180.218786 402.530135 402.530135 402.530136 402.530135-180.218786 402.530135-402.530136S734.311349 121.318097 512 121.318097z m0 758.16917c-196.413999 0-355.639035-159.225035-355.639035-355.639035S315.586001 168.209198 512 168.209198s355.639035 159.225035 355.639035 355.639034-159.225035 355.639035-355.639035 355.639035z"
        fill={getIconColor(color, 2, '#515151')}
      />
      <Path
        d="M228.006978 761.925817a281.175913 151.722881 0 1 0 562.351827 0 281.175913 151.722881 0 1 0-562.351827 0Z"
        fill={getIconColor(color, 3, '#515151')}
      />
    </Svg>
  );
};

IconTouxiang.defaultProps = {
  size: 18,
};

IconTouxiang = React.memo ? React.memo(IconTouxiang) : IconTouxiang;

export default IconTouxiang;
