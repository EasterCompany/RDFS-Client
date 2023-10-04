// Components
import File from './file';
// Library
import { useState, useRef } from 'react';
import { ScrollView, View, NativeEventEmitter } from 'react-native';


const Browser = ({view}:any) => {
  const [userFiles, setUserFiles] = useState<any>([]);
  const eventHandlersAdded = useRef<bool>(false);
  const eventEmitter = new NativeEventEmitter();
  const horizontalMargin = view.width * 0.005;
  const boxSize =
    (view.width > 1900 ? (view.width - 8) / 10 :
    view.width > 1200 ? (view.width - 8) / 8 :
    view.width > 600 ? (view.width - 8) / 4 :
    view.width / 2) - (horizontalMargin * 2)

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
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: view.width,
    minHeight: view.height
  };

  return <ScrollView
    style={scroll}
    contentContainerStyle={scrollContainer}
  >
    {userFiles.map((file:any, idx:any) => <File
      key={idx}
      file={file}
      boxSize={boxSize}
      horizontalMargin={horizontalMargin}
    />)}
  </ScrollView>;
};


export default Browser;
