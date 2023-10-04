// Library
import {
  Text,
  View,
  ScrollView,
  ViewStyle,
  TextStyle,
  Platform
} from 'react-native';


const NoUser = ({view}:any) => {

  const scroll = {
    width: view.width,
    height: view.height,
    backgroundColor: '#202029'
  };

  const scrollContainer = {
    width: view.width,
    minHeight: view.height
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

  return <ScrollView style={scroll} contentContainerStyle={scrollContainer}>
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
        use to deploy their own personal, educational or enterprise cloud (or local network) storage solution.{'\n\n'}

        What you are looking at right now is a frontend (client/application) used to upload, edit & delete files from
        an RDFS backend (server/API).
      </Text>
    </View>
    <Text style={infoHeader}>Why Would I Use RDFS?</Text>
    <View style={infoSection}>
      <Text style={infoSectionText}>
        You would use RDFS when you have files which aren't going to be in high-demand on a daily basis, such as
        personal photos, documents, videos, old projects you just don't want to delete, or maybe anything you just don't
        trust uploading to a big closed source corporation.
      </Text>
    </View>
    <Text style={infoHeader}>How Does it Work?</Text>
    <View style={infoSection}>
      <Text style={infoSectionText}>
        RDFS uses an extremely powerful compression algorithm, so files which are uploaded will be much smaller while
        they are stored on an RDFS server compared to when they are stored on your local system.{'\n\n'}

        Compression ratios vary, however you can expect up to 6 times smaller file size for your most common use-cases.
        {'\n\n'}

        Even though your files are heavily compressed, you'll still be able to serve them directly from an RDFS server
        because the compression algorithm is still extremely fast when dealing with smaller files such as images &
        source code.{'\n\n'}

        When a file is requested, it will either exist in a cold-storage (compressed on disk) state, or a hot-storage
        (decompressed & in-memory cached), if the file is in cold-storage it will first be copied into hot-storage and
        then served to it's user. A file will only be removed from hot-storage once the in-memory cache needs to free up
        space for another file or it hasn't been accessed for a certain amount of time, which ever comes first.{'\n\n'}
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
