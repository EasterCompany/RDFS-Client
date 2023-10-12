// Assets
import warningImg from '../shared/assets/images/warning.png'
// Library
import { ScrollView, Text, Image, TextStyle, ImageStyle, ViewStyle } from 'react-native';
import { serverAdr } from '../shared/library/api';


const ServerOffline = ({view}:any) => {

  const scroll:ViewStyle = {
    width: view.width,
    height: view.height,
  };

  const container:ViewStyle = {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: '5%'
  };

  const image:ImageStyle = {
    width: 128,
    height: 128
  };

  const h1:TextStyle = {
    textAlign: 'center',
    color: 'white',
    fontSize: 28,
    fontFamily: 'Metro',
    padding: 8,
  };

  const h2:TextStyle = {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontFamily: 'Metro',
    padding: 8,
  };

  return <ScrollView
    style={scroll}
    contentContainerStyle={container}
  >
    <Image
      resizeMode="contain"
      source={warningImg}
      style={image}
    />
    <Text style={h1}>Sorry!</Text>
    <Text style={h2}>The server hosted at <code>{serverAdr}</code> is offline.</Text>
  </ScrollView>;
};


export default ServerOffline;
