// Components
import Browser from '../components/fileBrowser/browser';
import Uploader from '../components/fileUploader/uploader';
// Library
import {useState, useRef} from 'react';
import {ScrollView, View, ViewStyle, NativeEventEmitter} from 'react-native';

const eventEmitter = new NativeEventEmitter();


const ViewManager = ({view, userData}:any) => {
  const [currentView, setView] = useState<String>('browser');
  const eventHandlersAdded = useRef<bool>(false);

  if (!eventHandlersAdded.current) {
    eventEmitter.addListener('navbarUploadBtnPressed', () => setView('uploader'));
    eventEmitter.addListener('navMenuChangeView', (view:string) => setView(view));
    eventHandlersAdded.current = true;
  }

  return <View>
    {
      currentView === 'browser' ? <Browser view={view} userData={userData}/> :
      currentView === 'uploader' ? <Uploader view={view}/> :
      <></>
    }
  </View>
};


export default ViewManager;
