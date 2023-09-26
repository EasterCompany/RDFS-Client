// Library
import { Pressable, Image } from 'react-native';
// Styles
import theme from '../../App.style';


const ImgBtn = ({onPress, style, image, width, height}:any) => <Pressable
  style={[theme.ImgBtn, style]}
  onPress={onPress}
><Image source={image} style={{width:width, height:height}}/></Pressable>;


export default ImgBtn;
