/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconSousuo = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M896.475 850.788L676.128 630.15c43.958-54.069 70.412-122.917 70.412-197.882C746.54 258.964 605.58 118 432.271 118 258.968 118 118 258.964 118 432.27c0 173.306 140.967 314.27 314.27 314.27 74.964 0 143.813-26.456 197.882-70.416l220.35 220.64c6.35 6.347 14.648 9.523 22.986 9.523 8.34 0 16.638-3.176 22.987-9.523 12.7-12.7 12.7-33.277 0-45.976zM183.021 432.269c0-137.453 111.8-249.248 249.25-249.248 137.452 0 249.247 111.796 249.247 249.248 0 137.453-111.795 249.25-249.248 249.25-137.448 0-249.249-111.796-249.249-249.25z"
        fill={getIconColor(color, 0, '#191F39')}
      />
    </Svg>
  );
};

IconSousuo.defaultProps = {
  size: 18,
};

IconSousuo = React.memo ? React.memo(IconSousuo) : IconSousuo;

export default IconSousuo;
