/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconPengyouquan = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M983.552 312.832c-25.6-60.928-62.464-115.712-109.568-162.816s-101.888-83.968-162.816-109.568C648.192 13.312 581.12 0 512 0S375.808 13.312 312.832 40.448c-60.928 25.6-115.712 62.464-162.816 109.568S66.048 251.904 40.448 312.832C13.312 375.808 0 442.88 0 512s13.312 136.192 40.448 199.168c25.6 60.928 62.464 115.712 109.568 162.816s101.888 83.968 162.816 109.568c62.976 26.624 130.048 40.448 199.168 40.448s136.192-13.312 199.168-40.448c60.928-25.6 115.712-62.464 162.816-109.568s83.968-101.888 109.568-162.816c26.624-62.976 40.448-130.048 40.448-199.168s-13.312-136.192-40.448-199.168z m-49.152-11.264l-217.088 231.936-14.848-453.12c100.864 44.544 182.784 122.88 231.936 221.184z m-485.376 376.832l-99.328-93.184-4.608-136.192 93.184-99.328 136.192-4.608 99.328 93.184 4.608 136.192-93.184 99.328c0 0.512-136.192 4.608-136.192 4.608z m212.992-613.888l10.24 317.952L341.504 71.68C394.24 51.2 451.584 39.936 512 39.936c52.224 0 102.912 8.704 150.016 24.576z m-360.448 25.088l231.936 217.088-453.12 14.848c44.544-100.864 122.88-182.784 221.184-231.936zM39.936 512c0-52.224 8.704-102.912 24.576-150.016l317.952-10.24L71.68 682.496C51.2 629.76 39.936 572.416 39.936 512z m49.664 210.432l217.088-231.936 14.848 453.12c-100.864-44.544-182.784-122.88-231.936-221.184z m272.384 237.056l-10.24-317.952 330.752 310.272c-52.736 20.48-110.592 31.744-170.496 31.744-52.224 0.512-102.912-8.192-150.016-24.064z m360.448-25.088l-231.936-217.088 453.12-14.848c-44.544 100.864-122.88 182.784-221.184 231.936z m237.056-272.384l-317.952 10.24L952.32 341.504c20.48 52.736 31.744 110.592 31.744 170.496 0 52.224-8.704 102.912-24.576 150.016z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconPengyouquan.defaultProps = {
  size: 18,
};

IconPengyouquan = React.memo ? React.memo(IconPengyouquan) : IconPengyouquan;

export default IconPengyouquan;