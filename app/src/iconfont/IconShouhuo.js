/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconShouhuo = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M928.282496 277.56976l-76.078723-146.396231C833.401546 95.091752 786.830881 66.835198 746.182089 66.835198L278.411429 66.835198c-40.59251 0-87.325881 28.093848-106.291838 63.905472l-76.023464 143.407154c-16.410762 31.028691-29.234835 82.761935-29.234835 117.812219l0 481.737766c0 46.027289 37.386492 83.468017 83.466993 83.468017l723.339336 0c46.027289 0 83.46904-37.44175 83.46904-83.468017l0-478.313783C957.137685 360.386954 944.476317 308.599474 928.282496 277.56976zM145.330458 300.17664l75.969229-143.352919c9.509585-17.932418 36.734646-34.344203 57.112766-34.344203l467.770659 0c20.270672 0 47.27777 16.410762 56.678884 34.398438l76.079746 146.340973c3.586688 6.955412 6.955412 15.868409 10.051937 25.432229L134.189723 328.651159C137.559471 317.946352 141.254629 307.838134 145.330458 300.17664zM901.491317 873.696786c0 15.32401-12.443403 27.821649-27.822672 27.821649L150.328285 901.518435c-15.377222 0-27.821649-12.498662-27.821649-27.821649L122.506637 391.95902c0-2.227738 0.434905-5.16258 0.651846-7.661494l777.407766 0c0.326435 3.695159 0.924045 7.824199 0.924045 11.085476L901.490294 873.696786z"
        fill={getIconColor(color, 0, '#bfbfbf')}
      />
      <Path
        d="M745.912959 537.539676 605.765035 687.25142l-56.568367-56.460919c-10.868535-10.868535-28.474518-10.868535-39.344077 0-10.867512 10.867512-10.867512 28.474518 0 39.34203l76.296687 76.079746c5.434779 5.433756 12.498662 8.150634 19.61678 8.150634 3.858888 0 7.661494-0.978281 11.304464-2.608407 4.074805-1.413186 7.878434-3.586688 11.030218-6.9022l158.459988-169.273265c10.487865-11.193947 9.890254-28.800953-1.303692-39.343053C774.061043 525.802354 756.455059 526.346753 745.912959 537.539676z"
        fill={getIconColor(color, 1, '#bfbfbf')}
      />
      <Path
        d="M429.046195 578.187445 262.055926 578.187445c-15.325034 0-27.822672 12.444427-27.822672 27.822672s12.498662 27.822672 27.822672 27.822672l166.991292 0c15.378246 0 27.822672-12.444427 27.822672-27.822672S444.425464 578.187445 429.046195 578.187445z"
        fill={getIconColor(color, 2, '#bfbfbf')}
      />
      <Path
        d="M344.599897 696.869474l-83.468017 0c-15.378246 0-27.821649 12.498662-27.821649 27.821649 0 15.432481 12.443403 27.822672 27.821649 27.822672l83.468017 0c15.379269 0 27.822672-12.390191 27.822672-27.822672C372.422569 709.368136 359.979166 696.869474 344.599897 696.869474z"
        fill={getIconColor(color, 3, '#bfbfbf')}
      />
    </Svg>
  );
};

IconShouhuo.defaultProps = {
  size: 18,
};

IconShouhuo = React.memo ? React.memo(IconShouhuo) : IconShouhuo;

export default IconShouhuo;