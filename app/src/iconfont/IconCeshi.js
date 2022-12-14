/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconCeshi = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M602.88 487.296c8.192 30.976 0.192 65.344-24.128 89.6-36.288 36.288-95.168 36.288-131.456 0-36.288-36.288-36.288-95.168 0-131.456 26.24-26.24 64.32-33.472 97.152-21.76l337.28-306.304c17.856-17.792 40.384-24.128 47.36-17.216 8.576 8.576 0.576 29.504-17.216 47.296L602.88 487.296zM512 176C326.464 176 176 326.464 176 512S326.464 848 512 848s336-150.464 336-336c0-44.096-9.024-85.952-24.448-124.544l81.408-90.688C939.968 360.704 960 433.984 960 512c0 247.424-200.576 448-448 448s-448-200.576-448-448 200.576-448 448-448c80.128 0 155.2 21.312 220.224 58.176l-88.064 81.024C603.584 185.792 558.976 176 512 176z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconCeshi.defaultProps = {
  size: 18,
};

IconCeshi = React.memo ? React.memo(IconCeshi) : IconCeshi;

export default IconCeshi;
