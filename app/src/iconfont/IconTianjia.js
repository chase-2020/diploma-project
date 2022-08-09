/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconTianjia = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1028 1024" width={size} height={size} {...rest}>
      <Path
        d="M846.741 178.16C757.26 89.114 638.33 40.07 511.793 40.07s-245.51 49.044-335 138.089S37.974 385.722 37.974 511.75s49.307 244.523 138.82 333.6S385.213 983.44 511.76 983.44s245.499-48.99 334.947-138.088 138.82-207.605 138.82-333.633-49.234-244.48-138.789-333.558z m-98.043 367.437H545.639v203.069c0 18.692-15.153 33.846-33.845 33.846s-33.846-15.154-33.846-33.845V545.596h-203.07c-18.692 0-33.845-15.153-33.845-33.846s15.153-33.846 33.845-33.846h203.069v-203.06c0-18.691 15.153-33.845 33.845-33.845 18.694 0 33.846 15.154 33.846 33.846v203.069h203.059c18.692 0 33.845 15.154 33.845 33.845s-15.153 33.847-33.845 33.847v-0.01z"
        fill={getIconColor(color, 0, '#ffc900')}
      />
    </Svg>
  );
};

IconTianjia.defaultProps = {
  size: 18,
};

IconTianjia = React.memo ? React.memo(IconTianjia) : IconTianjia;

export default IconTianjia;
