// Library
import {
  Text,
  ScrollView,
  ActivityIndicator,
  TextStyle
} from 'react-native';


const Loading = ({view}:any) => {

  const loadingTextStyle:TextStyle = {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Metro',
    padding: 16
  };

  return <ScrollView
    style={{
      width: view.width,
      height: view.height,
    }}
    contentContainerStyle={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <ActivityIndicator animating={true} color="white" size="large"/>
    <Text style={loadingTextStyle}>Loading...</Text>
  </ScrollView>;
};


export default Loading;
