import * as React from 'react';
import {memo} from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <G fill={props.color || '#1F1212'} clipPath="url(#a)">
      <Path d="m28.944 25.583-11.58-11.58L3.834.473H2.777l-.216.549c-.57 1.448-.813 2.929-.704 4.282.125 1.544.711 2.88 1.695 3.864L14.114 19.73l1.393-1.393 9.764 10.918c.972.971 2.644 1.029 3.673 0a2.6 2.6 0 0 0 0-3.672ZM9.22 17.285.946 25.557a2.6 2.6 0 0 0 0 3.672c.962.962 2.626 1.047 3.673 0l8.271-8.272-3.672-3.672ZM28.457 5.39l-4.692 4.692-1.224-1.224 4.692-4.692-1.224-1.224-4.692 4.692-1.224-1.224 4.692-4.692L23.561.494l-6.12 6.12a4.32 4.32 0 0 0-1.26 2.8 2.496 2.496 0 0 1-.177.78l3.976 3.977c.25-.101.514-.162.782-.178a4.32 4.32 0 0 0 2.8-1.259l6.12-6.12-1.225-1.224Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={props.color || '#1F1212'} d="M.18.474H29.71v29.532H.18z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const FoodIcon = memo(SvgComponent);
export default FoodIcon;
