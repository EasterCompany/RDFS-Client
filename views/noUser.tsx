// Library
import {
  Text,
  View,
  ScrollView,
  ViewStyle,
  TextStyle
} from 'react-native';


const NoUser = ({view}:any) => {

  const scroll:ViewStyle = {
    minWidth: view.width,
    minHeight: view.height,
  };

  const container:ViewStyle = {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '5%'
  };

  const header:ViewStyle = {
    width: '100%',
    padding: '5%',
  };

  const h1:TextStyle = {
    color: '#ffffff',
    fontSize: 124,
    fontFamily: 'Metro-Bold',
  };

  const h2:TextStyle = {
    color: '#ffffff66',
    fontSize: 72,
    fontFamily: 'Metro',
  };

  const h3:TextStyle = {
    color: '#ffffff33',
    fontSize: 48,
    fontFamily: 'Metro-Thin',
  };

  const infoHeader:TextStyle = {
    color: '#ffffff9f',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    paddingBottom: 16,
    fontSize: 64,
    fontFamily: 'Metro',
  };

  const infoSection:TextStyle = {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%'
  };

  const infoSectionText:TextStyle = {
    width: '100%',
    paddingTop: '1%',
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingBottom: '1%',
    color: '#ffffff',
    fontSize: 26,
    fontFamily: 'Metro-Thin'
  };

  return <ScrollView
    style={scroll}
    contentContainerStyle={container}
  >
    <View style={header}>
      <Text style={h1}>RDFS</Text>
      <Text style={h2}>Rapid Directory & File System</Text>
      <Text style={h3}>By Easter Company</Text>
    </View>
    <Text style={infoHeader}>What's RDFS?</Text>
    <View style={infoSection}>
      <Text style={infoSectionText}>
        RDFS is the "Rapid Directory and File System" backend developed by Easter Company which serves cold-storage
        files to users of it's applications. This is an open-source MIT licensed piece of software which anyone can
        use to deploy their own personal, educational or enterprise cloud (or local network) storage solution.{'\n'}
        {'\n'}
        What you are looking at right now is a frontend (client/application) used to upload, edit & delete files from
        an RDFS backend (server/API).
      </Text>
    </View>
    <Text style={infoHeader}>Getting Started</Text>
    <View style={infoSection}>
      <Text style={infoSectionText}>
        To get started, simply press "sign up" at the top right of this page and create an account. If you are using
        Easter Company servers to host your files then you'll automatically be subscribed to a free-tier membership.
      </Text>
    </View>
    <Text style={infoHeader}>Download</Text>
    <View style={infoSection}>
      <Text style={infoSectionText}>
        Currently we only support the web, you can use your web browser or install this page as a PWA. Although, soon
        you will be able to download this a native Android or iOS application.
      </Text>
    </View>
  </ScrollView>;
};


export default NoUser;
