/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconLianxikefu = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M473.789 181.798c-206.438 0-373.791 150.617-373.791 336.412 0 117.47 66.9 220.877 168.28 281.046l-0.074 135.992 128.829-87.73c24.774 4.654 50.447 7.105 76.756 7.105 206.439 0 373.791-150.617 373.791-336.412S680.229 181.798 473.789 181.798z m0 635.445c-2.193 0-4.379-0.028-6.561-0.068-0.973-0.017-1.943-0.042-2.914-0.067-0.903-0.024-1.804-0.053-2.705-0.084a390.053 390.053 0 0 1-18.307-1.016l0.115-0.079c-17.932-1.533-35.44-4.359-52.49-8.208l-0.4 0.284c-0.16-0.036-0.318-0.076-0.478-0.112l-39.377 28.046c0.116 0.036 0.231 0.075 0.348 0.112l-44.828 31.822-0.002-0.253-0.609 0.434 0.236-46.505-0.022-2.742 0.036 0.016 0.21-41.365c-0.194-0.099-0.39-0.195-0.583-0.294l-0.003-0.309a344.356 344.356 0 0 1-37.156-22.199v0.314c-72.397-49.721-121.368-125.082-129.667-210.784-0.034-0.348-0.063-0.697-0.096-1.045a268.632 268.632 0 0 1-0.321-3.718c-0.04-0.505-0.076-1.01-0.114-1.516a257.186 257.186 0 0 1-0.32-5 259.125 259.125 0 0 1-0.153-3.191c-0.025-0.579-0.051-1.157-0.072-1.736-0.04-1.118-0.07-2.238-0.097-3.359-0.012-0.51-0.029-1.02-0.038-1.531-0.029-1.624-0.047-3.25-0.047-4.88 0-165.152 150.617-299.033 336.412-299.033S810.201 353.058 810.201 518.21 659.584 817.243 473.789 817.243zM585.928 88.348c-87.215 0-167.453 26.884-231.044 71.945 36.051-9.885 74.188-15.396 113.668-15.844 36.546-12.096 76.088-18.722 117.375-18.722 185.795 0 336.41 133.883 336.41 299.035 0 51.862-14.86 100.636-40.991 143.154-4.598 31.461-13.5 61.685-26.151 90.168 64.72-60.486 104.521-142.719 104.521-233.322 0.002-185.796-167.35-336.414-373.788-336.414z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconLianxikefu.defaultProps = {
  size: 18,
};

IconLianxikefu = React.memo ? React.memo(IconLianxikefu) : IconLianxikefu;

export default IconLianxikefu;