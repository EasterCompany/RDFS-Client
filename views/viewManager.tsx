// Components
import Browser from '../components/fileBrowser/browser';
import Uploader from '../components/fileUploader/uploader';
// Library
import {useState, useRef} from 'react';
import {ScrollView, View, ViewStyle, NativeEventEmitter} from 'react-native';

const eventEmitter = new NativeEventEmitter();


const ViewManager = ({view}:any) => {
  const [currentView, setView] = useState<String>('browser');
  const eventHandlersAdded = useRef<bool>(false);

  if (!eventHandlersAdded.current) {
    eventEmitter.addListener('navbarUploadBtnPressed', () => setView('uploader'));
    eventEmitter.addListener('navMenuChangeView', (view:string) => setView(view));
    eventHandlersAdded.current = true;
  }

  const scroll:ViewStyle = {
    width: view.width,
    backgroundColor: '#202029'
  };

  const container:ViewStyle = {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: view.width,
  };

  return <ScrollView
    style={scroll}
    contentContainerStyle={container}
  >{
    currentView === 'browser' ? <Browser view={view}/> :
    currentView === 'uploader' ? <Uploader view={view}/> :
    <></>
  }</ScrollView>
};


export default ViewManager;
