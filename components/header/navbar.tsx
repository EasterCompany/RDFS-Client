// Assets
import navbar from './navbar.style';
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
// Library
import {useState} from 'react';
import {
  View,
  Platform,
  TextInput,
  Image,
  ViewStyle,
  ImageStyle,
  NativeEventEmitter
} from 'react-native';


const eventEmitter = new NativeEventEmitter();


const uploadBtnPressed = () => {
  eventEmitter.emit("navbarUploadBtnPressed", {})
};


const Navbar = ({view, loggedIn, onPressLogin, onPressRegister, onPressUser, onPressNav, navMenuOpen}:any) => {
  const [showSearchInput, setShowSearchInput] = useState<boolean>(view.width > 850);

  if (view.width > 850 && !showSearchInput) setShowSearchInput(true);
  const toggleShowSearchInput = () => {
    if (view.width <= 850) setShowSearchInput(!showSearchInput);
  }

  const navbarContainer:ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '50%'
  };

  const navbarContainerLeft:ViewStyle = {
    ...navbarContainer,
    justifyContent: 'flex-start'
  };

  const navbarContainerRight:ViewStyle = {
    ...navbarContainer,
    justifyContent: 'flex-end'
  };

  const searchInput:any = {
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

  const searchInputIconContainer:ViewStyle = {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 28,
    backgroundColor: '#20202966'
  };

  const uploadBtn:ViewStyle = {
    width: 128,
    height: 36,
    marginRight: 36
  };

  const uploadBtnIcon:ViewStyle = {
    width: 36,
    height: 36,
    marginRight: 28
  };

  const userBtnContainer:ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: 225
  };

  return loggedIn ?

  <View style={navbar.container}>
    <View style={navbarContainerLeft}>
      <ImgBtn
        width={28}
        height={28}
        image={navMenuOpen ? closeImg : menuImg}
        style={navbar.icon}
        onPress={onPressNav}
      />
      <View style={searchInputIconContainer}>
        <ImgBtn width={24} height={24} image={searchSVG} onPress={toggleShowSearchInput}/>
      </View>
      {showSearchInput && <TextInput style={searchInput}/>}
    </View>
    {view.width >= 850 && <ImgBtn
      width={34}
      height={34}
      image={logoImg}
      style={navbar.icon}
    />}
    <View style={navbarContainerRight}>
      {
        view.width > 850 ?
          <>
            <TextBtn text="Upload" style={uploadBtn} onPress={uploadBtnPressed}/>
          </>
        :
          <>
            <ImgBtn width={34} height={34} image={uploadSVG} style={uploadBtnIcon} onPress={uploadBtnPressed}/>
          </>
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
    <View style={userBtnContainer}>
      <RegisterBtn onPress={onPressRegister}/>
      <LoginBtn onPress={onPressLogin}/>
    </View>
  </View>
};


export default Navbar;
