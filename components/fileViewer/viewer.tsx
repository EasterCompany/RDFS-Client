// Assets
import theme from '../../shared/assets/ec.style';
// Components
import FadeModal from '../../shared/components/modals-native/fade';
// Library
import { USER } from '../../shared/library/api';
import { useState, useRef } from 'react';
import { Video, ResizeMode } from 'expo-av';
import WebView from 'react-native-web-webview';
import fileIcon from '../../shared/library/fileIcon';
import {
  View,
  Text,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
  NativeEventEmitter,
  ActivityIndicator
} from 'react-native';


const Viewer = ({view}:any) => {
  const [file, setFile] = useState<any>({});
  const [fileData, setFileData] = useState<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const eventHandlersAdded = useRef<boolean>(false);
  const eventEmitter = new NativeEventEmitter();
  const video = useRef(null);

  const requestFileData = async () => {
    const user = await USER();
    const apiResponse = await fetch(
      `${process.env.API_DOMAIN}/api/rdfs/view/${file.uuid}`,
      {
        headers: new Headers({
          'Authorization': `Basic ${user.uuid} ${user.session}`
        }),
      }
    );
    const apiJson = await apiResponse.json();
    setFileData(apiJson.data);
    console.log(apiJson.data);
  };

  if (!eventHandlersAdded.current) {
    eventEmitter.addListener('RDFSOpenFileViewer', (event:any) => {
      setFileData(null);
      setFile(event.file);
      setOpen(true);
    });
    eventHandlersAdded.current = true;
  };

  if (isOpen && fileData === null) requestFileData();

  return <FadeModal
    title={file.name + file.ext}
    visible={isOpen}
    onClose={() => setOpen(false)}
    style={modalContent}
  >{
      fileData === null ? <LoadingIndicator/> :

      fileData.startsWith('data:image') ?
        <Image
          style={{flex: 1, width: '100%'}}
          resizeMode="contain"
          source={{uri: fileData}}
        />
      :

      fileData.startsWith('data:video') ?
        <View style={{ width: '100%', height: '100%' }}>
          <Video
            source={{ uri: fileData }}
            style={{ flex: 1, width: '100%', height: '100%' }}
            videoStyle={{ width: '100%', height: '100%' }}
            resizeMode="contain"
            useNativeControls
          />
        </View>
      :

      fileData.startsWith('data:application/pdf') ?
        <WebView
          source={{ uri: fileData }}
          style={{ flex: 1, width: '100%', height: '100%' }}
        />
      :

      <View style={{
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image
          style={{flex: 1, width: '33%'}}
          resizeMode="contain"
          source={fileIcon(file.name + file.ext, file.mimeType)}
        />
        <Text style={loadingText}>No Preview Available</Text>
      </View>

  }</FadeModal>
}


const LoadingIndicator = () => {
  return <>
    <ActivityIndicator color="#ffffff" animating size={128}/>
    <Text style={loadingText}>Loading...</Text>
  </>
}


const modalContent:ViewStyle = {
  backgroundColor: '#121212'
};

const loadingText = {
  color: '#ffffff',
  paddingTop: 32,
  fontSize: 24
};

export default Viewer;
