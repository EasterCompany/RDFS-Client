// Assets
import closeIMG from '../../assets/images/close.png';
// Components
import TextBtn from '../buttons/text';
import ImgBtn from '../buttons/img';
import * as DocumentPicker from 'expo-document-picker';
// Library
import fileSize from '../../library/fileSize';
import fileIcon from '../../library/fileIcon';
import {useState, useRef} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  ViewStyle,
  TextStyle,
  PressableStyle,
  ImageStyle,
  ActivityIndicator
} from 'react-native';

type Uploader = {
  view: {
    width: number,
    height: number
  }
};


const Uploader = ({view}:Uploader) => {
  const [selectedFiles, setSelectedFiles] = useState<array>([]);
  const [isUploading, setUploading] = useState<boolean>(false);

  const uploadSelectedFiles = () => {
    setUploading(true);
  };

  const container:ViewStyle = {
    width: view.width,
    height: view.height,
    paddingLeft: 16,
    paddingRight: 16
  };

  const loadingContainer:ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle'
  };

  const h1:TextStyle = {
    color: '#ffffff',
    fontSize: 36,
    fontFamily: 'Metro-Thin',
    marginTop: view.height * 0.05,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: view.height * 0.025
  };

  const h2:TextStyle = {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Metro-Thin',
    marginTop: view.height * 0.05,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: view.height * 0.05
  };

  const selectedFilesSection:ViewStyle = {
    width: view.width - 32,
    maxWidth: 980,
    marginTop: view.height * 0.025,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#ffffff99',
    borderRadius: 6,
  };

  const uploadBtnsSection:ViewStyle = {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: view.width - 32,
    maxHeight: 48,
    maxWidth: 980,
    marginTop: 0,
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  const selectBtn:PressableStyle = {
    maxWidth: 200,
    backgroundColor: 'transparent'
  };

  const uploadBtn:PressableStyle = {
    maxWidth: 200,
    opacity: selectedFiles.length > 0 ? 1 : 0.1
  };

  const selectFilesToUpload = async () => {
    try {
      const picker = await DocumentPicker.getDocumentAsync({multiple: true, copyToCacheDirectory: true});
      setSelectedFiles(selectedFiles.concat(picker.assets));
    } catch (error) {
      alert("Sorry, there was a problem with one or more of the files you selected.");
    }
  };

  if (isUploading) return <View style={loadingContainer}>
    <ActivityIndicator animating={true} color="white" size="large"/>
    <Text style={h2}>Uploading Files...</Text>
  </View>

  return <View style={container}>
    <Text style={h1}>File Upload</Text>
    <View style={selectedFilesSection}>
      {
        selectedFiles.length === 0 ? <Text style={h2}>No files selected...</Text> :
        selectedFiles.map((x:any, idx:any) => {
          return <StagedFile
            key={idx}
            name={x.name}
            type={x.mimeType}
            size={x.size}
            last={idx+1 === selectedFiles.length}
            remove={() => setSelectedFiles(selectedFiles.filter((x, i) => i !== idx))}
          />
        })
      }
    </View>
    <View style={uploadBtnsSection}>
      <TextBtn text="Select Files" style={selectBtn} onPress={selectFilesToUpload}/>
      <TextBtn
        text="Upload"
        style={uploadBtn}
        disabled={selectedFiles.length === 0}
        onPress={uploadSelectedFiles}
      />
    </View>
  </View>;
};


type StagedFile = {
  name: string,
  type: string,
  size: number,
  last: boolean,
  remove: () => void;
};


const StagedFile = ({name, type, size, last,  remove}:StagedFile) => {

  const container:ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderWidth: last ? 0 : 1,
    borderColor: '#ffffff'
  };

  const text:TextStyle = {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Metro',
    marginTop: 'auto',
    marginBottom: 'auto'
  };

  const textThin:TextStyle = {
    textAlign: 'center',
    color: '#ffffff66',
    fontSize: 18,
    fontFamily: 'Metro-Thin',
    marginTop: 'auto',
    marginBottom: 'auto'
  };

  const fileIconStyle:ImageStyle = {
    width: 32,
    height: 32
  };

  const labelContainer:ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 8
  };

  return <View style={container}>
    <Image source={fileIcon(name, type)} style={fileIconStyle}/>
    <View style={labelContainer}>
      <Text style={text}>{name}</Text>
      <Text style={textThin}>&nbsp;({fileSize(size)})</Text>
    </View>
    <ImgBtn onPress={remove} image={closeIMG} width={24} height={24}/>
  </View>
};


export default Uploader;
