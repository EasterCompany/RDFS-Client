// Assets
import closePNG from '../../assets/images/close.png';
import checkSVG from '../../assets/svgs/check.svg';
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
import { LinearGradient } from 'expo-linear-gradient';

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
    overflow: 'hidden',
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
    opacity: selectedFiles.length === 0 || isUploading ? 0.1 : 1
  };

  const selectFilesToUpload = async () => {
    try {
      const picker = await DocumentPicker.getDocumentAsync({multiple: true, copyToCacheDirectory: true});
      setSelectedFiles(selectedFiles.concat(picker.assets));
    } catch (error) {
      alert("Sorry, there was a problem with one or more of the files you selected.");
    }
  };

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
            uploadStatus={50}
            remove={() => setSelectedFiles(selectedFiles.filter((x, i) => i !== idx))}
          />
        })
      }
    </View>
    <View style={uploadBtnsSection}>
      <TextBtn text={isUploading ? "Add More" : "Select Files"} style={selectBtn} onPress={selectFilesToUpload}/>
      <TextBtn
        text="Upload"
        style={uploadBtn}
        disabled={selectedFiles.length === 0 || isUploading}
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
  uploadStatus: undefined|number,
  remove: () => void;
};


const StagedFile = ({name, type, size, last, uploadStatus, remove}:StagedFile) => {

  const container:viewStyle = {
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderWidth: last ? 0 : 1,
    borderColor: '#ffffff'
  };

  const fileContextContainer:ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
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
    color: '#ffffff99',
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

  const uploadProgressGradient = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: uploadStatus === undefined ? `0%` : `${uploadStatus}%`,
    height: '100%'
  };

  return <View style={container}>
    <LinearGradient style={uploadProgressGradient} colors={['rgba(20,200,20,0.9)', 'transparent']}/>
    <View style={fileContextContainer}>
      <Image source={fileIcon(name, type)} style={fileIconStyle}/>
      <View style={labelContainer}>
        <Text style={text}>{name}</Text>
        <Text style={textThin}>&nbsp;({
          uploadStatus === undefined || uploadStatus === 100?
            fileSize(size)
          :
            `${fileSize(size * (uploadStatus / 100))} / ${fileSize(size)}`
        })</Text>
      </View>
      {
        uploadStatus === undefined ?
          <ImgBtn onPress={remove} image={closePNG} width={24} height={24}/>
        :
          uploadStatus === 100 ?
            <ImgBtn image={checkSVG} width={24} height={24}/>
          :
            <ActivityIndicator color="#ffffff" animating/>
      }
    </View>
  </View>
};


export default Uploader;
