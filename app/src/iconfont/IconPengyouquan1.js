/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconPengyouquan1 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 1024C229.230021 1024 0 794.769979 0 512S229.230021 0 512 0s512 229.230021 512 512-229.230021 512-512 512z m0.42935-800.000537a279.249308 279.249308 0 0 0-32.561912 1.915975c-26.152788 2.948562-51.221468 9.458583-74.787421 18.912872 0 0 194.316344 191.608218 199.490012 198.731137V239.228512c-5.79086-1.964277-11.707304-3.733199-17.67205-5.379757-23.735547-6.361895-48.707623-9.848218-74.467556-9.848218z m202.969895 83.240252c-7.789484-7.760503-15.950356-14.934943-24.378499-21.587723a286.849878 286.849878 0 0 0-66.285216-39.300562s1.429736 272.315304 0 281.01179l145.044126-144.496704a293.183866 293.183866 0 0 0-8.728687-16.21226c-12.300881-21.220629-27.433325-41.288453-45.65065-59.413468z m63.669401 98.298633S586.82499 599.134457 579.626935 604.290952h205.088738c1.970717-5.770465 3.748226-11.667589 5.373317-17.609795 6.40805-23.703346 9.911547-48.510122 9.911547-74.202432 0-10.979556-0.691254-21.810985-1.951397-32.445987a282.689476 282.689476 0 0 0-18.980494-74.49439zM493.867472 625.806759l145.040905 144.497778a287.548646 287.548646 0 0 0 16.293837-8.69434c21.298985-12.20857 41.414038-27.312034 59.65605-45.487497 7.761577-7.739036 14.938164-15.893468 21.642466-24.290482 16.341065-20.537962 29.531774-42.764344 39.439027-66.050147 0 0-273.31891 1.427589-282.072285 0.024688z m-74.417107-45.38982v204.353476a294.790709 294.790709 0 0 0 17.673123 5.356143c23.764528 6.386583 48.686155 9.872906 74.470776 9.872905 10.991363 0 21.862507-0.68696 32.512537-1.914901a286.830558 286.830558 0 0 0 74.788495-18.938633c0.023614 0-194.270189-191.555623-199.444931-198.72899z m-20.411304-85.230289L254.046457 639.682281c2.713493 5.527883 5.647027 10.932327 8.727614 16.235874 12.252579 21.271078 27.409711 41.31314 45.651724 59.46499 7.764797 7.76265 15.950356 14.909182 24.378499 21.566255 20.630273 16.335698 42.892075 29.425509 66.309903 39.297342 0 0-1.479111-272.339992-0.07621-281.060092z m-165.155958-57.744369c-6.384436 23.678658-9.883639 48.511195-9.88364 74.203505 0 10.952721 0.691254 21.808839 1.947103 32.4213 2.959296 26.083019 9.441409 51.063681 19.006256 74.495463 0 0 192.223262-193.597182 199.420243-198.731136H239.258566c-1.97179 5.745778-3.74608 11.665442-5.375463 17.610868z m133.531102-173.947975c-21.346214 12.232184-41.461266 27.338868-59.654976 45.463883-7.837786 7.787338-14.986465 15.941769-21.66608 24.290482-16.368973 20.537962-29.531774 42.789031-39.463715 66.098448 0 0 273.367212-1.449057 282.095899-0.049375L383.705895 254.80104c-5.519296 2.748914-10.967748 5.624486-16.29169 8.694339z"
        fill={getIconColor(color, 0, '#07C160')}
      />
    </Svg>
  );
};

IconPengyouquan1.defaultProps = {
  size: 18,
};

IconPengyouquan1 = React.memo ? React.memo(IconPengyouquan1) : IconPengyouquan1;

export default IconPengyouquan1;
