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

  return <>{userFiles.map((file:any) => <File data={file} size={fileSize}/>)}</>
};


export default Browser;
