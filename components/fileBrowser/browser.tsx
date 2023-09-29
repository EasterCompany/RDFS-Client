// Components
import File from './file';
// Library
import { useState, useRef } from 'react';
import { ScrollView, View, NativeEventEmitter } from 'react-native';


const Browser = ({view}:any) => {
  const [userFiles, setUserFiles] = useState<any>([]);
  const eventHandlersAdded = useRef<bool>(false);
  const eventEmitter = new NativeEventEmitter();
  const fileSize = view.width / 8.88;

  if (!eventHandlersAdded.current) {
    eventEmitter.addListener('RDFSGenericDataMessage', (event:any) => {
      setUserFiles(event['userFiles']);
    });
    eventHandlersAdded.current = true;
  };

  const scroll:ViewStyle = {
    width: view.width,
    height: view.height,
    backgroundColor: '#202029'
  };

  const scrollContainer:ViewStyle = {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: view.width,
    height: view.height
  };

  return <ScrollView
    style={scroll}
    contentContainerStyle={scrollContainer}
  >{userFiles.map((file:any, idx:any) => <File key={idx} data={file} size={fileSize}/>)}</ScrollView>;
};


export default Browser;
