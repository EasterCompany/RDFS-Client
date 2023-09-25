// Library
import {
  Text,
  ScrollView,
  ActivityIndicator
} from 'react-native';
// Styles
import theme from '../App.style';


const Loading = ({ view }) => {
  return <ScrollView
    style={{
      width: view.width,
      height: view.height,
    }}
    contentContainerStyle={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.default.backgroundColor
    }}
  >
    <ActivityIndicator animating={true} color="white" size="large"/>
    <Text style={textStyle}>Loading...</Text>
  </ScrollView>;
};


const textStyle = {
  color: 'white',
  fontSize: 16,
  fontFamily: 'Metro',
  padding: 16
};

export default Loading;
