// Components
import FadeModal from '../../shared/components/modals-native/fade';
// Library
import { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  NativeEventEmitter,
  ActivityIndicator
} from 'react-native';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';

const renderers = {
  iframe: IframeRenderer
};

const customHTMLElementModels = {
  iframe: iframeModel
};


const Viewer = ({view}:any) => {
  const [file, setFile] = useState<any>({});
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const eventHandlersAdded = useRef<boolean>(false);
  const eventEmitter = new NativeEventEmitter();

  if (!eventHandlersAdded.current) {
    eventEmitter.addListener('RDFSOpenFileViewer', (event:any) => {
      setLoading(true);
      setOpen(true);
      setFile(event.file);
      fetch(
        `${process.env.API_DOMAIN}/api/rdfs/view`,
        {
          method: 'POST',
          headers: new Headers({
            'Authorization': `Basic ${event.user.uuid} ${event.user.session}`,
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            uuid: event.file.uuid
          }),
        }
      ).then((resp:any) => resp.text().then((html:string) => {
        console.log(html);
        setHtmlContent(html);
        setLoading(false);
      }));
    });
    eventHandlersAdded.current = true;
  };

  const getImageSource = () => {
    return `data:image/jpeg;base64,${htmlContent}`
  }

  const modalContainer:ViewStyle = {
    backgroundColor: '#20202999'
  };

  return <FadeModal
    title={file.name + file.ext}
    visible={isOpen}
    onClose={() => setOpen(false)}
    style={modalContainer}
  >
    {
      isLoading ?
        <LoadingIndicator/>
      :
        <Image
          style={{
            flex: 1,
            width: '100%',
          }}
          resizeMode="contain"
          source={{uri: getImageSource()}}
        />
    }
  </FadeModal>
}


const LoadingIndicator = () => {

  const loadingText = {
    color: '#ffffff',
    paddingTop: 32,
    fontSize: 24
  };

  return <>
    <ActivityIndicator color="#ffffff" animating size={128}/>
    <Text style={loadingText}>Loading...</Text>
  </>
}


export default Viewer;
