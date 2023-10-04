// Library
import {
  Modal,
  View,
  ScrollView,
  Text,
  Dimensions,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
// Assets
import closeImg from '../../assets/images/close.png';
// Components
import ImgBtn from '../buttons/img';
// Styles
import theme from '../../App.style';


const FadeModal = ({title, visible, style, onClose, children}:any) => {
  const window = Dimensions.get('window');

  const scrollContainer = {
    width: '100%',
    height: window.height - 52
  };

  const contentContainer = [
    theme.modalContent,
    {
      overflowX: 'hidden',
      height: Platform.OS === 'web' ? '100%' : undefined,
      minHeight:
        Platform.OS === 'ios' ? window.height - 86 :
        Platform.OS === 'android' ? window.height - 52 :
        '100%'
    },
    style
  ];

  return <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        top:
          Platform.OS === 'web' ? window.height * 0.125 :
          Platform.OS === 'ios' ? 34 : 0,
        height:
          Platform.OS === 'web' ? '75%' : window.height
      }}
    >
      <View style={theme.modalHeader}>
        <Text style={theme.modalTitle}>
          {title}
        </Text>
        <ImgBtn
          onPress={onClose}
          width={34}
          height={34}
          image={closeImg}
        />
      </View>
      <ScrollView
        style={scrollContainer}
        contentContainerStyle={contentContainer}
      >{children}</ScrollView>
    </KeyboardAvoidingView>
  </Modal>;
}


export default FadeModal;
