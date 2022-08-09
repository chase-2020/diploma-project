/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconHuiyuankax = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M960 649.856l-0.16 19.52c-1.312 71.04-10.08 99.616-25.472 128.416a174.464 174.464 0 0 1-72.576 72.576c-31.296 16.736-62.336 25.632-147.936 25.632H310.144l-19.52-0.16c-71.04-1.312-99.616-10.08-128.416-25.472a174.464 174.464 0 0 1-72.576-72.576l-4-7.872c-13.536-27.744-20.96-58.784-21.6-130.048L64 320h1.6c3.264-46.752 11.424-70.208 24.032-93.76A174.464 174.464 0 0 1 162.24 153.6l7.872-4C197.824 136.096 228.864 128.64 300.16 128L713.888 128c85.568 0 116.608 8.896 147.904 25.632a174.464 174.464 0 0 1 72.576 72.576c12.608 23.584 20.768 47.04 24 93.792H960v329.856zM896 384H128v274.912l0.32 18.24c1.248 48.192 6.336 69.088 17.76 90.432 10.784 20.16 26.176 35.552 46.336 46.336 23.872 12.8 47.136 17.632 108.672 18.048l412.8 0.032c68.352 0 92.672-4.704 117.696-18.08a110.496 110.496 0 0 0 46.336-46.336c12.8-23.872 17.632-47.136 18.048-108.672L896 384z m-452.256 49.76c16.32 0 24.512 7.584 24.512 22.72 1.152 4.672 0.576 10.528-1.76 17.504l1.568-3.68c0.512-1.024 0 0.768-1.568 5.44l-97.984 285.248c-7.04 21.024-18.08 30.912-33.28 29.76-15.136 1.152-26.24-8.736-33.248-29.76l-97.984-283.52a73.6 73.6 0 0 1-1.76-17.472c1.184-17.504 8.768-26.24 22.752-26.24 16.32 0 26.848 8.16 31.52 24.48l73.472 213.504c1.184 3.52 2.944 5.248 5.28 5.248 0.928 0 1.856-1.12 2.784-3.36l74.208-215.36c5.824-16.352 16.32-24.512 31.488-24.512z m104.992 31.488v290.496c0 24.512-9.312 36.16-28 35.008-17.472 1.152-26.816-10.496-28-35.008V465.28c-1.152-22.176 8.192-32.64 28-31.488 18.688-1.184 28 9.312 28 31.488z m159.264-29.76c74.656 1.184 112.576 40.832 113.76 119.04-2.336 74.624-39.68 113.152-112 115.456h-59.52v85.76c0 24.512-9.92 36.16-29.76 35.008-17.472 0-26.24-11.68-26.24-35.008v-287.008c1.184-22.144 14.016-33.248 38.496-33.248h75.264z m-1.76 56h-56v124.256h57.76c37.344-1.152 56.576-22.176 57.76-63.008 0-40.832-19.84-61.248-59.52-61.248z m16.672-299.456L310.112 192c-68.352 0-92.672 4.704-117.696 18.08a110.496 110.496 0 0 0-46.336 46.336c-9.024 16.896-14.112 33.472-16.448 63.552h764.736c-2.336-30.08-7.392-46.656-16.448-63.552a110.496 110.496 0 0 0-46.336-46.336c-23.872-12.8-47.136-17.632-108.672-18.048z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconHuiyuankax.defaultProps = {
  size: 18,
};

IconHuiyuankax = React.memo ? React.memo(IconHuiyuankax) : IconHuiyuankax;

export default IconHuiyuankax;
