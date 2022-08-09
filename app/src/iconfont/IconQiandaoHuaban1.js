/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconQiandaoHuaban1 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M810.666667 970.666667H213.333333A32 32 0 0 1 181.12 938.666667V213.333333A32 32 0 0 1 213.333333 181.333333h597.333334a32 32 0 0 1 32 32v725.333334a32 32 0 0 1-32 32z m-565.333334-64h533.333334v-661.333334h-533.333334z"
        fill={getIconColor(color, 0, '#F86402')}
      />
      <Path
        d="M330.666667 330.666667A32 32 0 0 1 298.666667 298.666667V128a32 32 0 0 1 64 0v170.666667a32 32 0 0 1-32 32zM693.12 330.666667A32 32 0 0 1 661.333333 298.666667V128a32 32 0 0 1 64 0v170.666667a32 32 0 0 1-32.213333 32zM512 330.666667a32 32 0 0 1-32-32V128a32 32 0 0 1 64 0v170.666667a32 32 0 0 1-32 32zM490.666667 714.666667a32.64 32.64 0 0 1-22.613334-9.386667l-85.333333-85.333333a32.213333 32.213333 0 0 1 0-45.226667 31.786667 31.786667 0 0 1 45.226667 0l55.893333 55.893333 126.933333-219.946666a32 32 0 1 1 55.466667 32l-147.84 256a32 32 0 0 1-23.466667 15.786666z"
        fill={getIconColor(color, 1, '#0091FD')}
      />
      <Path
        d="M661.12 181.333333h64v64h-64zM479.786667 181.333333h64v64h-64zM298.666667 181.333333h64v64h-64z"
        fill={getIconColor(color, 2, '#013701')}
      />
    </Svg>
  );
};

IconQiandaoHuaban1.defaultProps = {
  size: 18,
};

IconQiandaoHuaban1 = React.memo ? React.memo(IconQiandaoHuaban1) : IconQiandaoHuaban1;

export default IconQiandaoHuaban1;
