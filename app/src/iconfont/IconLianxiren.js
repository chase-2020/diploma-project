/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconLianxiren = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M620.744191 538.879184c82.736353-40.523949 140.308583-124.785028 140.308583-222.936465 0-137.367601-111.714338-249.080915-249.02668-249.080915-137.367601 0-249.080915 111.713314-249.080915 249.080915 0 98.151437 57.57223 182.412516 140.363841 222.936465C235.330238 586.429153 111.796714 740.736565 111.796714 923.694503c0 18.464537 15.032368 33.443693 33.496905 33.443693 18.464537 0 33.497928-14.979156 33.497928-33.443693 0-183.774537 149.46001-333.343017 333.234547-333.343017 183.77556 0 333.234547 149.568481 333.234547 333.343017 0 18.464537 14.978133 33.443693 33.443693 33.443693 18.519796 0 33.496905-14.979156 33.496905-33.443693C912.20124 740.736565 788.668739 586.429153 620.744191 538.879184zM329.886801 315.942719c0-100.438527 81.70179-182.194552 182.140317-182.194552 100.384291 0 182.086082 81.756025 182.086082 182.194552 0 100.384291-81.702813 182.086082-182.086082 182.086082C411.587568 498.0288 329.886801 416.32701 329.886801 315.942719z"
        fill={getIconColor(color, 0, '#a8a8a8')}
      />
    </Svg>
  );
};

IconLianxiren.defaultProps = {
  size: 18,
};

IconLianxiren = React.memo ? React.memo(IconLianxiren) : IconLianxiren;

export default IconLianxiren;