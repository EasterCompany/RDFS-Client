import { useState } from 'react';
import { Pressable } from 'react-native';


const File = ({size}:any) => {
  const [ isHover, setHover ] = useState(false);
  const [ isPress, setPress ] = useState(false);

  const containerStyle = {
    cursor: 'pointer',
    minWidth: 164,
    width: size * 1.33,
    minHeight: 164,
    height: size,
    borderWidth: isPress ? 2 : 1,
    borderRadius: 3,
    borderColor: isPress ? '#fe8605' : '#ffffff66',
    backgroundColor: isHover ? '#fe860533' : 'rgba(0,0,0,0)',
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16
  };

  return <Pressable
    style={containerStyle}
    onPress={() => {}}
    onHoverIn={() => setHover(true)}
    onHoverOut={() => setHover(false)}
    onPressIn={() => setPress(true)}
    onPressOut={() => setPress(false)}
  >
  </Pressable>
};


export default File;
