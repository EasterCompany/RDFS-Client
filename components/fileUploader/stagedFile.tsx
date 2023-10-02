// Assets
import checkSVG from '../../assets/svgs/check.svg';
import closePNG from '../../assets/images/close.png';
// Components
import ImgBtn from '../buttons/img';
// Library
import {
  View,
  Text,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ActivityIndicator
} from 'react-native';
import fileSize from '../../library/fileSize';
import fileIcon from '../../library/fileIcon';
import {LinearGradient, LinearGradientStyle} from 'expo-linear-gradient';

type StagedFile = {
  name: string,
  type: string,
  size: number,
  compressedSize: undefined|number,
  last: boolean,
  uploadStatus: undefined|number,
  remove: () => void;
};


const StagedFile = ({name, type, size, compressedSize, last, uploadStatus, remove}:StagedFile) => {

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

  const fileSizeText:TextStyle = {
    textAlign: 'center',
    color: '#ffffff99',
    fontSize: 18,
    fontFamily: 'Metro-Thin',
    textDecorationLine: compressedSize === undefined ? '' : 'line-through',
    marginTop: 'auto',
    marginLeft: 16,
    marginBottom: 'auto'
  };

  const compressedSizeText:TextStyle = {
    textAlign: 'center',
    color: '#ffffff99',
    fontSize: 18,
    fontFamily: 'Metro-Thin',
    marginTop: 'auto',
    marginLeft: 6,
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

  const uploadProgressGradient:LinearGradientStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: uploadStatus === undefined ? `0%` : `${uploadStatus}%`,
    height: '100%'
  };

  const uploadProgressText:TextStyle = {
    textAlign: 'center',
    color: '#fffffff9',
    fontSize: 18,
    fontFamily: 'Metro-Thin',
    marginTop: 'auto',
    marginRight: 8,
    marginBottom: 'auto'
  };

  return <View style={container}>
    <LinearGradient style={uploadProgressGradient} colors={
      [
        (compressedSize === undefined && uploadStatus === 100) ? 'rgba(20,20,200,0.9)' : 'rgba(20,200,20,0.9)',
        'transparent'
      ]
    }/>
    <View style={fileContextContainer}>
      <Image source={fileIcon(name, type)} style={fileIconStyle}/>
      <View style={labelContainer}>
        <Text style={text}>{name.substring(0, 16)}{name.length > 16 ? '...' : ''}</Text>
        <Text style={fileSizeText}>
        {
          uploadStatus === undefined || uploadStatus === 100 ?
            fileSize(size)
          :
            `(${fileSize(size * (uploadStatus / 100))} / ${fileSize(size)})`
        }
        </Text>
        {
          compressedSize === undefined ?
            <></>
          :
            <Text style={compressedSizeText}>{compressedSize}</Text>
        }
      </View>
      {
        uploadStatus === undefined ?
          <ImgBtn onPress={remove} image={closePNG} width={24} height={24}/>
        :
        uploadStatus === 100 && compressedSize !== undefined ?
          <ImgBtn image={checkSVG} width={24} height={24}/>
        :
        <>
          {uploadStatus === 100 ?
            <Text style={uploadProgressText}>Compressing...</Text>
          :
            <Text style={uploadProgressText}>{uploadStatus}%</Text>
          }
          <ActivityIndicator color="#ffffff" animating/>
        </>
      }
    </View>
  </View>
};


export default StagedFile;
