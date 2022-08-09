/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconYonghutouxiang = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 993.962667A481.962667 481.962667 0 1 1 993.962667 512 482.304 482.304 0 0 1 512 993.962667z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M512 60.074667A451.925333 451.925333 0 1 1 60.074667 512 451.925333 451.925333 0 0 1 512 60.074667M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M794.282667 755.029333a145.749333 145.749333 0 0 0-10.922667-13.653333 87.04 87.04 0 0 0-11.946667-11.264l-10.581333-8.192a34.133333 34.133333 0 0 0-8.192-4.778667L750.933333 716.8l-58.368-38.229333a247.466667 247.466667 0 0 0-27.306666-15.36l-78.848-38.229334v-37.546666a151.552 151.552 0 0 0 52.906666-53.248 178.858667 178.858667 0 0 0 20.138667-73.728v-28.672a245.76 245.76 0 0 0-2.730667-51.2l-2.389333-16.384a166.229333 166.229333 0 0 0-46.762667-113.664 140.288 140.288 0 0 0-116.053333-44.032 119.125333 119.125333 0 0 0-80.213333 45.397333 211.968 211.968 0 0 0-46.08 110.250667s-3.072 52.565333-2.730667 59.050666l2.730667 36.864a249.856 249.856 0 0 0 19.797333 73.728 130.389333 130.389333 0 0 0 53.248 53.248v37.546667l-78.506667 38.912q-8.874667 4.437333-17.408 9.898667L273.066667 716.8l-5.802667 3.413333a108.544 108.544 0 0 0-13.312 9.898667 136.533333 136.533333 0 0 0-16.725333 16.042667 95.232 95.232 0 0 0-13.312 20.138666A52.224 52.224 0 0 0 228.693333 819.2a344.064 344.064 0 0 0 74.069334 48.810667 427.349333 427.349333 0 0 0 467.626666-25.6 123.562667 123.562667 0 0 0 24.576-23.210667 50.858667 50.858667 0 0 0 10.581334-31.402667 52.224 52.224 0 0 0-3.072-17.749333 68.266667 68.266667 0 0 0-8.192-15.018667z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </Svg>
  );
};

IconYonghutouxiang.defaultProps = {
  size: 18,
};

IconYonghutouxiang = React.memo ? React.memo(IconYonghutouxiang) : IconYonghutouxiang;

export default IconYonghutouxiang;
