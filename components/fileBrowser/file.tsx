// Library
import {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ViewStyle,
  TextStyle,
  ImageStyle,
  PressableStyle
} from 'react-native';
import fileSize from '../../library/fileSize';
import fileIcon from '../../library/fileIcon';

type File = {
  file: any,
  size: number
};


const File = ({file, size}:File) => {
  const [ isHover, setHover ] = useState(false);
  const [ isPress, setPress ] = useState(false);
  const name = `${file.name}${file.ext}`;
  const icon = fileIcon(file.ext, file.mimeType);
  const originalSize = fileSize(file.size);
  const compressedSize = fileSize(file.compressedSize);
  if (size < 164) size = 164;

  const containerStyle:PressableStyle = {
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    cursor: 'pointer',
    minWidth: 164,
    width: size,
    minHeight: 164,
    height: size,
    padding: isPress ? 0 : 1,
    borderWidth: isPress ? 2 : 1,
    borderRadius: 3,
    borderColor: isPress ? '#fe8605' : '#ffffff66',
    backgroundColor: isHover ? '#fe860533' : 'rgba(0,0,0,0)',
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16
  };

  const iconImage:ImageStyle = {
    width: size - 52,
    height: size - 52
  };

  const detailContainer:ViewStyle = {
    textAlign: 'left',
    width: size,
    height: 52,
    paddingTop: 6,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 6,
    borderTopColor: isPress ? '#fe8605' : '#ffffff66',
    borderWidth: 1,
    borderLeft: 0,
    borderRight: 0,
    borderBottom: 0
  };

  const detailText:TextStyle = {
    userSelect: 'none',
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Metro-Thin',
    paddingBottom: 4
  };

  return <Pressable
    style={containerStyle}
    onPress={() => {}}
    onHoverIn={() => setHover(true)}
    onHoverOut={() => setHover(false)}
    onPressIn={() => setPress(true)}
    onPressOut={() => setPress(false)}
  >
    <Image
      source={icon}
      width={size}
      height={size}
      style={iconImage}
    />
    <View style={detailContainer}>
      <Text style={detailText}>{name.substring(0, 16)}{name.length > 16 ? '...' : ''}</Text>
      <Text style={detailText}>{compressedSize} / {originalSize}</Text>
    </View>
  </Pressable>
};


export default File;
