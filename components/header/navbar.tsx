// Library
import { View, Platform, TextInput, Image } from 'react-native';
// Assets
import menuImg from '../../assets/images/menu.png';
import userImg from '../../assets/images/user.png';
import logoImg from '../../assets/images/rdfs.png';
import closeImg from '../../assets/images/close.png';
import searchSVG from '../../assets/svgs/search.svg';
import uploadSVG from '../../assets/svgs/upload.svg';
// Components
import ImgBtn from '../../components/buttons/img';
import TextBtn from '../../components/buttons/text';
import LoginBtn from '../../components/buttons/login';
import RegisterBtn from '../../components/buttons/register';
// Styles
import navbar from './navbar.style';


const Navbar = ({ view, loggedIn, onPressLogin, onPressRegister, onPressUser, onPressNav, navMenuOpen }) => {
  return loggedIn ?

  <View style={navbar.container}>
    <View style={{ ...navbarContainer, justifyContent: 'left' }}>
      <ImgBtn
        width={28}
        height={28}
        image={navMenuOpen ? closeImg : menuImg}
        style={navbar.icon}
        onPress={onPressNav}
      />
      <View style={searchInputIconContainerStyle}>
        <Image source={searchSVG} resizeMode="contain" style={searchInputIconStyle}/>
      </View>
      <TextInput style={searchInputStyle}/>
    </View>
    {view.width >= 850 && <ImgBtn
      width={34}
      height={34}
      image={logoImg}
      style={navbar.icon}
    />}
    <View style={{ ...navbarContainer, justifyContent: 'right' }}>
      {
        view.width >= 850 ?
          <TextBtn text="Upload" style={uploadBtnStyle}/> :
          <ImgBtn width={34} height={34} image={uploadSVG} style={uploadBtnStyle1}/>
      }
      <ImgBtn
        width={34}
        height={34}
        image={userImg}
        style={navbar.icon}
        onPress={onPressUser}
      />
    </View>
  </View>

  :

  <View style={navbar.container}>
    <ImgBtn
      width={34}
      height={34}
      image={logoImg}
      style={navbar.icon}
    />
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%',
      width: 225
    }}>
      <RegisterBtn onPress={onPressRegister}/>
      <LoginBtn onPress={onPressLogin}/>
    </View>
  </View>
}


const navbarContainer = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  maxWidth: '50%'
};

const searchInputStyle = {
  outline: 'none',
  fontSize: 18,
  fontFamily: 'Metro-Thin',
  width: 236,
  height: 36,
  marginLeft: -36,
  paddingLeft: 40,
  paddingRight: 4,
  borderRadius: 4,
  backgroundColor: '#ffffffd9'
};

const searchInputIconContainerStyle = {
  width: 36,
  height: 36,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 36,
  backgroundColor: '#20202966'
};


const searchInputIconStyle = {
  width: 24,
  height: 24
};

const uploadBtnStyle = {
  width: 128,
  height: 36,
  marginRight: 36
};

const uploadBtnStyle1 = {
  width: 36,
  height: 36,
  marginRight: 36
};

export default Navbar;
