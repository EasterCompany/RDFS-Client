// Assets
import theme from '../App.style';
import warningImg from '../assets/images/warning.png'
// Library
import { ScrollView, Text, Image } from 'react-native';


const ServerOffline = ({ view }) => {
  return <ScrollView
    style={{
      width: view.width,
      height: view.height,
    }}
    contentContainerStyle={{
      alignItems: 'center',
      justifyContent: 'center',
      width: view.width,
      minHeight: view.height,
      backgroundColor: theme.default.backgroundColor
    }}
  >
    <Image
      resizeMode="contain"
      source={warningImg}
      style={imageStyle}
    />
    <Text style={textStyle}>Sorry!</Text>
    <Text style={textStyle}>Server Offline</Text>
  </ScrollView>;
};


const imageStyle = {
  width: 128,
  height: 128
};

const textStyle = {
  textAlign: 'center',
  color: 'white',
  fontSize: 28,
  fontFamily: 'Metro',
  padding: 8,
};

export default ServerOffline;
