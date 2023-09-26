// Library
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
// Styles
import theme from '../../App.style';


const TextBtn = ({text, onPress, onHover, style, disabled}:any) => {
  const [ isHover, setHover ] = useState(false);
  const [ isPress, setPress ] = useState(false);
  return <Pressable
    style={(pressed) => [
      theme.button, style,

      isHover && onHover === undefined ? theme.buttonHover :
      isHover && onHover !== undefined ? onHover :
      undefined,

      isPress ? theme.buttonPress : undefined
    ]}
    onPress={disabled ? null : onPress}
    onHoverIn={() => disabled ? null : setHover(true)}
    onHoverOut={() => setHover(false)}
    onPressIn={() => disabled ? null : setPress(true)}
    onPressOut={() => setPress(false)}
  >
    <Text style={[
      theme.buttonText,
      style !== undefined && style.color !== undefined ? {
        color: style.color,
      } : {}
    ]}>{text}</Text>
  </Pressable>;
}


export default TextBtn;
