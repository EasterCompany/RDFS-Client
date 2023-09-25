// Library
import {
  Text,
  View,
  ScrollView
} from 'react-native';
// Styles
import theme from '../App.style';


const NoUser = ({ view } : any) => {
  return <ScrollView
    style={{
      minWidth: view.width,
      minHeight: view.height,
    }}
    contentContainerStyle={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: '5%'
    }}
  >
    <View style={headerViewStyle}>
      <Text style={headerTitle1Style}>RDFS</Text>
      <Text style={headerTitle2Style}>Rapid Directory & File System</Text>
      <Text style={headerTitle3Style}>By Easter Company</Text>
    </View>
    <Text style={infoHeaderStyle}>What's RDFS?</Text>
    <View style={infoSectionStyle}>
      <Text style={infoSectionTextStyle}>
        RDFS is the "Rapid Directory and File System" backend developed by Easter Company which serves cold-storage
        files to users of it's applications. This is an open-source MIT licensed piece of software which anyone can
        use to deploy their own personal, educational or enterprise cloud (or local network) storage solution.{'\n'}
        {'\n'}
        What you are looking at right now is a frontend (client/application) used to upload, edit & delete files from
        an RDFS backend (server/API).
      </Text>
    </View>
    <Text style={infoHeaderStyle}>Getting Started</Text>
    <View style={infoSectionStyle}>
      <Text style={infoSectionTextStyle}>
        To get started, simply press "sign up" at the top right of this page and create an account. If you are using
        Easter Company servers to host your files then you'll automatically be subscribed to a free-tier membership.
      </Text>
    </View>
    <Text style={infoHeaderStyle}>Download</Text>
    <View style={infoSectionStyle}>
      <Text style={infoSectionTextStyle}>
        Currently we only support the web, you can use your web browser or install this page as a PWA. Although, soon
        you will be able to download this a native Android or iOS application.
      </Text>
    </View>
  </ScrollView>;
};


const headerViewStyle = {
  width: '100%',
  padding: '5%',
};

const headerTitle1Style = {
  color: '#ffffff',
  fontSize: 124,
  fontFamily: 'Metro-Bold',
};

const headerTitle2Style = {
  color: '#ffffff66',
  fontSize: 72,
  fontFamily: 'Metro',
};

const headerTitle3Style = {
  color: '#ffffff33',
  fontSize: 48,
  fontFamily: 'Metro-Thin',
};

const infoHeaderStyle = {
  color: '#ffffff9f',
  width: '90%',
  marginLeft: '5%',
  marginRight: '5%',
  paddingBottom: 16,
  fontSize: 64,
  fontFamily: 'Metro',
};

const infoSectionStyle = {
  width: '90%',
  marginLeft: '5%',
  marginRight: '5%',
  marginBottom: '5%'
};

const infoSectionTextStyle = {
  width: '100%',
  paddingTop: '1%',
  paddingLeft: '2%',
  paddingRight: '2%',
  paddingBottom: '1%',
  color: '#ffffff',
  fontSize: 26,
  fontFamily: 'Metro-Thin'
};

export default NoUser;
