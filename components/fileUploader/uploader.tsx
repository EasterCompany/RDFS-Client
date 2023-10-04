// Components
import TextBtn from '../buttons/text';
import StagedFile from './stagedFile';
import BottomToolbar from '../footer/bottomToolbar';
import * as DocumentPicker from 'expo-document-picker';
// Library
import {useState, useRef} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ViewStyle,
  TextStyle,
  PressableStyle,
  Platform
} from 'react-native';
import fileSize from '../../library/fileSize';
import {serverAdr, USER} from '../../shared/library/api';

type Uploader = {
  view: {
    width: number,
    height: number
  }
};


const Uploader = ({view}:Uploader) => {
  const [selectedFiles, setSelectedFiles] = useState<array>([]);
  const [isUploading, setUploading] = useState<boolean>(false);
  const [totalUploadSize, setTotalUploadSize] = useState<number>(0);
  const [totalCompressedSize, setTotalCompressedSize] = useState<number>(0);
  const [totalSavedPercentage, setTotalSavedPercentage] = useState<number>(0);
  const fileToUpload = useRef<number>(0);

  const selectFilesToUpload = async () => {
    try {
      const picker = await DocumentPicker.getDocumentAsync({multiple: true, copyToCacheDirectory: false});
      if (!picker.canceled) {
        console.log('PICKER:', picker);
        console.log('PICKER.ASSETS:', picker.assets);
        setSelectedFiles(selectedFiles.concat(picker.assets));
      }
    } catch (error) {
      alert("Sorry, there was a problem with one or more of the files you selected.");
    }
  };

  const uploadNextFile = async () => {
    const user = await USER();
    const formData = new FormData();

    Platform.OS === 'web' ?
      formData.append(
        'file',
        selectedFiles[fileToUpload.current].file,
        selectedFiles[fileToUpload.current].file.name
      )
    :
      formData.append(
        'file',
        {
          uri: selectedFiles[fileToUpload.current].uri,
          name: selectedFiles[fileToUpload.current].name,
          type: selectedFiles[fileToUpload.current].mimeType
        }
      )

    const req = new XMLHttpRequest();
    req.upload.addEventListener("progress", (event) => {
      const uploadPercentage = Math.round((event.loaded / event.total) * 100);
      setSelectedFiles(c => {
        c[fileToUpload.current].uploadStatus = uploadPercentage;
        return [ ...c ];
      });
    });
    req.addEventListener("load", (event) => {
      const resp = JSON.parse(event.target.response);
      const newTotalUploadSize = totalUploadSize + resp.data.uploadSize;
      const newTotalCompressedSize = totalCompressedSize + resp.data.compressedSize
      setTotalUploadSize(newTotalUploadSize);
      setTotalCompressedSize(newTotalCompressedSize);
      if (newTotalUploadSize > 0 && newTotalCompressedSize > 0) setTotalSavedPercentage(
        ((newTotalUploadSize - newTotalCompressedSize) / newTotalUploadSize) * 100
      );
      setSelectedFiles(c => {
        c[fileToUpload.current].compressedSize = fileSize(resp.data.compressedSize);
        fileToUpload.current++;
        return [ ...c ];
      })
    });

    //req.addEventListener("error", errorHandler, false);
    //req.addEventListener("abort", abortHandler, false);
    req.open('POST', `${serverAdr}api/rdfs/upload?mimeType=${selectedFiles[fileToUpload.current].mimeType}`);
    req.setRequestHeader('Authorization',`Basic ${user.uuid} ${user.session}`);
    req.send(formData);
  };

  if (selectedFiles.length === 0 && isUploading) setUploading(false);
  else if (isUploading && selectedFiles.length === fileToUpload.current) setUploading(false);
  else if (
    selectedFiles.length > 0 &&
    isUploading &&
    selectedFiles.length > fileToUpload.current &&
    selectedFiles[fileToUpload.current].uploadStatus === undefined
  ) {
    try {
      uploadNextFile();
    } catch (error) {
      console.log(error);
    }
  }

  const scroll:ViewStyle = {
    width: view.width,
    maxHeight: view.height - 64,
    backgroundColor: '#202029'
  };

  const scrollContainer:ViewStyle = {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: view.width
  };

  const container:ViewStyle = {
    width: view.width,
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
    borderColor: '#ffffff',
    borderRadius: 6,
  };

  const selectBtn:PressableStyle = {
    width: 150,
    height: 42,
    backgroundColor: 'transparent'
  };

  const uploadBtn:PressableStyle = {
    width: 150,
    height: 42,
    opacity: selectedFiles.length === 0 || isUploading ? 0.1 : 1
  };

  const bottomBarButtonContainer:ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'space-evenly'
  }

  const bottomBarFileSizeText:TextStyle = {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Metro-Thin'
  };

  const savedPercentage:TextStyle = {
    color: totalSavedPercentage > 1 ? 'rgb(20,200,20)' :
      totalSavedPercentage < 0 ? 'rgb(200,20,20)' :
      'rgb(200,200,200)',
    fontSize: 16,
    fontFamily: 'Metro-Thin'
  };

  return <View style={{ width: view.width, height: view.height }}>
    <ScrollView
        style={scroll}
        contentContainerStyle={scrollContainer}
      >
      <View style={container}>
        <Text style={h1}>File Uploader</Text>
        <View style={selectedFilesSection}>
          {
            selectedFiles.length === 0 ? <Text style={h2}>No files selected...</Text> :
            selectedFiles.map((x:any, idx:any) => {
              return <StagedFile
                key={idx}
                name={x.name}
                type={x.mimeType}
                size={x.size}
                compressedSize={x.compressedSize}
                last={idx+1 === selectedFiles.length}
                uploadStatus={x.uploadStatus}
                remove={() => setSelectedFiles(selectedFiles.filter((x, i) => i !== idx))}
              />
            })
          }
        </View>
      </View>
    </ScrollView>
    <BottomToolbar view={view}>
      <View style={bottomBarButtonContainer}>
        <TextBtn
          text={isUploading ? "Add More" : "Select Files"}
          style={selectBtn}
          onPress={selectFilesToUpload}
        />
        {
          view.width > 720 ? <>
            <Text style={bottomBarFileSizeText}>
              Uploaded: {fileSize(totalUploadSize)}
            </Text>
            <Text style={bottomBarFileSizeText}>
              Saved: {fileSize(totalUploadSize - totalCompressedSize)}&nbsp;
              <Text style={savedPercentage}>({Math.ceil(totalSavedPercentage)}%)</Text>
            </Text>
            </>
          :
            <></>
        }
        <TextBtn
          text="Upload"
          style={uploadBtn}
          disabled={selectedFiles.length === 0 || isUploading}
          onPress={() => setUploading(true)}
        />
      </View>
    </BottomToolbar>
  </View>
};


export default Uploader;
