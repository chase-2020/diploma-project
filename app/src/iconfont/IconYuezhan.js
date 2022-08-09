/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconYuezhan = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M939.015123 464.918261c-1.024 7.212522-4.452174 13.890783-9.728 18.899478-5.231304 4.986435-61.840696 32.768-256.690086 17.92-21.437217-1.647304-65.446957-4.87513-86.884174-9.616696-19.366957-4.296348-33.190957-0.178087-51.244522-2.381913-103.090087-12.53287-123.970783 5.209043-178.086957 44.52174-54.227478 22.950957-107.564522 76.933565-129.80313 122.612869l78.981565 328.503652a32.50087 32.50087 0 0 1-20.858435 36.997566 32.278261 32.278261 0 0 1-39.401739-15.515827l-1.202087-2.292869a32.589913 32.589913 0 0 1-3.094261-8.837565L22.512863 39.535304a32.879304 32.879304 0 0 1-0.200348-11.620174l0.089043-0.467478A32.300522 32.300522 0 0 1 53.67808 0.26713c15.582609-0.26713 29.139478 10.685217 32.233739 26.045218l11.575652 57.544348c87.552-40.470261 152.108522-65.424696 224.812522-59.881739 39.757913 3.049739 80.606609 11.931826 124.838957 27.202782 39.579826 13.668174 78.246957 31.165217 114.131478 48.061218 42.22887 19.878957 107.853913 31.632696 151.173565 34.927304 62.486261 4.763826 102.444522-7.501913 162.660174-36.441044 45.723826-21.993739 73.037913-45.879652 73.305043-46.124521a32.144696 32.144696 0 0 1 36.730435-4.251826c11.931826 6.455652 18.543304 19.745391 16.62887 33.213217l-62.753392 384.356174zM707.568863 198.878609c-51.110957-3.917913-124.326957-17.65287-173.679305-40.870957-70.566957-33.213217-140.221217-63.510261-216.464695-69.320348-32.300522-2.470957-34.415304 3.250087-83.389218 15.671653-43.942957 11.130435-86.884174 26.89113-123.369739 45.07826l93.606957 440.075131C232.566428 557.83513 290.511471 485.932522 334.120515 467.478261c59.058087-24.998957 132.162783-53.782261 199.94713-48.617739 21.170087 1.625043 43.230609 4.941913 65.513739 9.906087 18.476522 4.073739 59.436522 6.856348 77.868522 8.258782 140.822261 10.752 171.430957 29.317565 199.368348 6.589218l50.665739-299.920696c-53.915826 29.985391-116.49113 63.065043-219.91513 55.184696zM434.383471 556.544c17.296696 0 33.369043 14.024348 33.369044 31.365565L467.685732 823.652174l85.214609 73.282783L645.772689 823.652174l0.044521-235.742609c0-17.341217 16.072348-31.365565 33.369044-31.365565 17.296696 0 33.413565 14.024348 33.413565 31.365565L712.555297 690.086957s74.440348-67.383652 75.865044-67.383653h137.683478c17.296696 0 31.321043 14.024348 31.321044 31.343305v4.140521c0 17.318957-14.024348 31.365565-31.321044 31.365566h-122.523826l-90.980174 68.87513v42.607304L935.163993 801.391304c0.957217 0 22.26087-10.930087 22.26087 31.031653V912.695652c0 17.341217-4.964174 44.521739-22.26087 44.521739l-44.521739 44.521739c0 17.318957-14.002087 22.238609-31.298783 22.238609h-137.683478c-17.296696 0-31.365565-4.919652-31.365565-22.238609v-22.260869c0-17.318957 14.06887-22.372174 31.365565-22.372174L846.120515 957.217391l44.521739-44.521739 0.022261-44.81113h-197.320348c-0.445217 0.222609-0.868174 0.489739-1.335652 0.690087 0 0-117.715478 88.642783-135.279305 88.642782-25.444174 0-133.565217-89.043478-133.565217-89.043478-8.347826 0-22.26087-22.483478-22.26087-44.521739l0.089044-235.742609c0-17.341217 16.072348-31.365565 33.391304-31.365565z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconYuezhan.defaultProps = {
  size: 18,
};

IconYuezhan = React.memo ? React.memo(IconYuezhan) : IconYuezhan;

export default IconYuezhan;