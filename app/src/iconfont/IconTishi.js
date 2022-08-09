/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconTishi = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 958.708971c-246.312872 0-446.708971-200.396099-446.708971-446.708971S265.686105 65.290005 512 65.290005 958.708971 265.686105 958.708971 512 758.312872 958.708971 512 958.708971zM512 129.523959c-210.893174 0-382.476041 171.582867-382.476041 382.476041S301.106826 894.475018 512 894.475018s382.476041-171.582867 382.476041-382.476041S722.892151 129.523959 512 129.523959z"
        fill={getIconColor(color, 0, '#231815')}
      />
      <Path
        d="M612.658538 648.167263l-2.446726-3.530407-7.680936-3.421936h-3.530406c-4.103458 0-8.594749 1.083681-22.639627 7.974625l-22.500456 15.190981c-6.163373 3.901867-12.991895 7.185656-20.347421 9.756201-7.742335 2.740414-15.918551 4.9088-24.26566 6.441713-5.77554 1.068332-10.390651 1.827625-15.392572 1.563612-6.984065-0.836041-8.950859-3.577478-9.66308-4.598738-2.090615-2.926656-2.818185-8.408507-2.075265-15.453971 1.099031-10.329253 4.042059-24.49795 8.733918-42.120306 4.831029-18.040888 9.53926-33.711799 14.044878-46.966685 4.52199-13.239536 9.848299-27.068496 15.996323-41.577954 6.054903-14.33959 10.917654-24.730241 14.44806-30.924313 3.236718-5.729491 8.098445-12.078083 14.494109-18.97005 6.054903-6.612605 20.23895-22.097274 12.062733-36.979216-4.444219-8.021697-12.248975-12.837376-24.49795-13.61202-5.977132 0-12.589736 1.300622-20.192901 3.948939-7.928576 2.772136-12.961196 4.878101-14.927991 5.992481-2.028193 1.099031-5.17179 3.128247-19.031449 14.47876-13.766538 11.226692-17.653055 15.733333-19.697621 19.650549-1.997494 3.778046-3.545756 9.105379-4.691859 22.794145-0.433882 5.095042-2.384303 15.238053-9.43079 35.151591l-19.96061 63.939242-16.074094 44.1178c-4.15053 15.06716-5.714142 28.121478-4.78498 39.859823 0.86674 11.412934 3.158946 22.066575 6.813173 31.621185 4.025687 10.607592 9.616008 19.263739 16.584723 25.705451 7.633864 7.092535 17.064654 11.506055 27.470655 13.007245 2.833535 0.51063 5.961782 0.789992 9.368368 0.789993 8.563026 0 18.536168-1.719154 30.522154-5.28026 14.865569-4.428869 27.129894-8.888438 37.428448-13.612019 10.344602-4.66116 20.069081-10.096962 28.972868-16.150842 8.067746-5.559623 16.414855-11.521404 24.977881-17.947767 10.979052-8.253988 17.932418-16.708544 21.323655-25.937743C614.919021 665.138796 618.155738 656.126538 612.658538 648.167263z"
        fill={getIconColor(color, 1, '#231815')}
      />
      <Path
        d="M483.835544 376.224664c5.16258 4.316306 11.573593 6.67605 19.228946 7.121188 8.992815 0.890276 21.50171-4.494361 37.480636-16.203031 15.935947-11.706623 24.39562-21.0095 25.285897-27.999704 0.890276-6.988158-1.469468-17.759479-7.078209-32.405037-5.65172-14.600533-10.905374-23.950482-15.84692-27.999705-4.984524-4.051269-10.816347-6.27696-17.537422-6.722098-13.087063-0.445138-24.75173 5.520737-35.122938 17.850553-10.327206 12.374842-16.960277 22.300912-19.897166 29.69123-2.937912 7.433296-4.363378 12.730952-4.363378 15.846919-0.445138 5.429663 1.113357 12.507872 4.719488 21.276583C474.307539 365.450273 478.670917 371.995339 483.835544 376.224664z"
        fill={getIconColor(color, 2, '#231815')}
      />
    </Svg>
  );
};

IconTishi.defaultProps = {
  size: 18,
};

IconTishi = React.memo ? React.memo(IconTishi) : IconTishi;

export default IconTishi;