// Components
import TextBtn from '../../shared/components/buttons-native/text';
// Library
import {
  useState
} from 'react';
import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  Image,
  ImageStyle,
  Button,
  ButtonStyle
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { POST, clientAPI } from '../../shared/library/api';
import * as Clipboard from 'expo-clipboard';


const Toolbar = ({file}:any) => {
  const [selectedPrivacy, setSelectedPrivacy] = useState(file.privacy);
  const privacyOptions = [
    {key: '1', value: 'private'},
    {key: '2', value: 'public'}
  ]

  const containerStyle:ViewStyle = {
    zIndex: '1000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    width: '100%',
    backgroundColor: '#202029',
    paddingTop: 6,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 6
  };

  return <View style={containerStyle}>
    <SelectList
      setSelected={(val) => setSelectedPrivacy(val)}
      data={privacyOptions}
      save="value"
      fontFamily="Metro-Bold"
      placeholder={file.privacy}
      boxStyles={{
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 24,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ffffff',
        backgroundColor: '#202029',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 16
      }}
      dropdownStyles={{
        borderColor: '#ffffff',
        backgroundColor: '#202029',
      }}
      inputStyles={{
        color: '#ffffff',
        marginRight: 16,
        textTransform: 'capitalize'
      }}
      dropdownTextStyles={{
        color: '#ffffff',
        textTransform: 'capitalize'
      }}
      onSelect={() => selectedPrivacy !== file.privacy && POST(
        'edit',
        (resp:any) => {
          console.log(resp);
        },
        (resp:any) => {
          console.log(resp);
          file.privacy = selectedPrivacy;
        },
        {
          'file_uuid': file.uuid,
          'privacy': selectedPrivacy
        }
      )}
    />

    <TextBtn
      text="Share"
      style={{
        width: 128,
        height: 36,
        borderColor: '#ffffff',
        borderWidth: 1,
        backgroundColor: '#202029',
      }}
      onPress={async () => {
        await Clipboard.setStringAsync(
          `${clientAPI}download/${file.uploadedBy}/${file.uuid}`
        );
      }}
    />

  </View>
}


export default Toolbar;
