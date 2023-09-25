// Assets
import theme from '../App.style';
import warningImg from '../assets/images/warning.png'
// Library
import { ScrollView, Text, Image } from 'react-native';
import { serverAdr } from '../shared/library/api';


const ServerOffline = ({ view }) => {
  return <ScrollView
    style={{
      width: view.width,
      height: view.height,
    }}
    contentContainerStyle={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'left',
      width: '100%',
      minHeight: 'fit-content',
      paddingBottom: '5%',
      backgroundColor: theme.default.backgroundColor
    }}
  >
    <Image
      resizeMode="contain"
      source={warningImg}
      style={imageStyle}
    />
    <Text style={textStyle}>Sorry!</Text>
    <Text style={text2Style}>The server hosted at <code>{serverAdr}</code> is offline.</Text>
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

const text2Style = {
  textAlign: 'center',
  color: 'white',
  fontSize: 18,
  fontFamily: 'Metro',
  padding: 8,
};

export default ServerOffline;
