// Library
import * as Font from 'expo-font';
import { useState, useEffect, useRef } from 'react';
import { isTemplateTag } from './shared/library/devTools';
import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
import { __INIT_USER__, USER, logout, oapi, isNative, serverAdr } from './shared/library/api';
import { NativeEventEmitter } from 'react-native';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
// Components
import Navbar from './components/header/navbar';
import LoginModal from './components/modals/login';
import RegisterModal from './components/modals/register';
import UserModal from './components/modals/user';
import SideMenu from './components/header/sideMenu';
import NavMenuContent from './components/header/navMenuContent';
// Views
import Loading from './views/loading';
import NoUser from './views/noUser';
import ServerOffline from './views/serverOffline';
import ViewManager from './views/viewManager';
// Styles
import theme from './App.style';
import { isLoggedIn } from '../dashboard/src/shared/library/api';

/* Dev Mode Web Compatibility */
if (!isNative) {
  const docHead = document.querySelector('head') as HTMLElement;
  if (docHead !== undefined && docHead !== null) docHead.style.display = 'hidden';
  if (isTemplateTag.test(document.title) && process.env.REACT_APP_NAME !== undefined)
    document.title = `[DEV] ${process.env.REACT_APP_NAME}`;
};

/* Load Custom Fonts */
const loadCustomFonts = async () => {
  return await Font.loadAsync({
    'Metro': require('./shared/assets/fonts/Metropolis-Regular.otf'),
    'Metro-Thin': require('./shared/assets/fonts/Metropolis-Thin.otf'),
    'Metro-Bold': require('./shared/assets/fonts/Metropolis-Bold.otf'),
    'Metro-Light': require('./shared/assets/fonts/Metropolis-Light.otf'),
    'Metro-Italic': require('./shared/assets/fonts/Metropolis-RegularItalic.otf'),
  });
};

/* Interfaces for Window & Screen Dimensions */
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');


const App = () => {
  const [userData, setUserData] = useState(undefined);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [navMenuOpen, setNavMenu] = useState<boolean>(false);
  const [userModalOpen, setUserModal] = useState<boolean>(false);
  const [loginModalOpen, setLoginModal] = useState<boolean>(false);
  const [registerModalOpen, setRegisterModal] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<any>({
    window: windowDimensions,
    view: {
      width: windowDimensions.width,
      height: Platform.OS === 'ios' ? windowDimensions.height - 74 : windowDimensions.height - 52
    },
    screen: screenDimensions,
  });
  const [serverStatus, setServerStatus] = useState(0);
  const eventHandlersAdded = useRef(false);
  const infoSocket = useRef(null);
  const eventEmitter = new NativeEventEmitter();

  const toggleNavMenu = () => setNavMenu(!navMenuOpen);
  const toggleUserModal = () => setUserModal(!userModalOpen);
  const toggleLoginModal = () => setLoginModal(!loginModalOpen);
  const toggleRegisterModal = () => setRegisterModal(!registerModalOpen);
  const reCheckUserData = () => USER().then((localData) => {
    setUserData(localData);
    setUserIsLoggedIn(localData.session !== undefined);
  });

  if (!eventHandlersAdded.current) {
    eventEmitter.addListener("closeStaticUI", () => {setUserModal(false);setNavMenu(false);});
    eventHandlersAdded.current = true;
  };

  useEffect(() => {
    loadCustomFonts();

    if (userData === undefined) USER().then((localData) => {
      setUserData(localData);
      if (localData.session !== undefined) {
        oapi(
          "user/refresh",
          (resp) => {
            setUserData(null);
            setUserIsLoggedIn(false);
            logout();
          },
          (resp) => __INIT_USER__(resp).then(() => USER().then((newData) => {
            setUserData(newData);
            setUserIsLoggedIn(true);
          })),
          { uuid: localData.uuid, session: localData.session }
        );
      };
    })

    if (infoSocket.current === null && userIsLoggedIn) {
      infoSocket.current = new WebSocket(
        `${serverAdr}api/ws/rdfs/info`
          .replace('https://', 'wss://')
          .replace('http://', 'ws://')
      );
      infoSocket.current.onopen = () => {
        setServerStatus(1);
        infoSocket.current.send(JSON.stringify(userData));
      };
      infoSocket.current.onmessage = (event:any) => {
        eventEmitter.emit('RDFSGenericDataMessage', JSON.parse(event.data));
      };
      infoSocket.current.onclose = (event:any) => setServerStatus(-1);
      infoSocket.current.onerror = (event:any) => setServerStatus(-1);
    } else if (!userIsLoggedIn) {
      setServerStatus(1);
    };

    const userDataInterval = setInterval(
      () => {
        if (infoSocket.current !== null && userIsLoggedIn) {
          infoSocket.current.send(JSON.stringify(userData))
        }
      },
      10000
    );

    const subscription = Dimensions.addEventListener('change', ({window, screen}) => {
      setDimensions({
        window,
        view: {
          width: window.width,
          height: Platform.OS === 'ios' ? window.height - 72 : window.height - 52
        },
        screen
      });
    });

    return () => {
      clearInterval(userDataInterval);
      subscription?.remove();
    }
  }, [ dimensions.window, dimensions.screen, userData ]);

  return <>
    <StatusBar barStyle="light-content" backgroundColor="#202029"/>
    <View>
      {/* GUI Elements */}
      <Navbar
        view={dimensions.window}
        loggedIn={userIsLoggedIn}
        onPressLogin={toggleLoginModal}
        onPressRegister={toggleRegisterModal}
        onPressUser={toggleUserModal}
        onPressNav={toggleNavMenu}
        navMenuOpen={navMenuOpen}
      />

      {/* View Manager */}
      {
        serverStatus === 0 ? <Loading view={dimensions.view}/> :
        serverStatus === -1 ? <ServerOffline view={dimensions.view}/> :
        serverStatus === 1 && userIsLoggedIn ? <ViewManager view={dimensions.view}/> :
        <NoUser view={dimensions.window}/>
      }

      {/* Modals & Overlays */}
      {
        userIsLoggedIn ?
          <>
            <UserModal
              user={userData}
              reCheckUserData={reCheckUserData}
              visible={userModalOpen}
              onClose={toggleUserModal}
            />
            {navMenuOpen && <SideMenu view={dimensions.view}>
              <NavMenuContent/>
            </SideMenu>}
          </>
        :
          <>
            <LoginModal
              visible={loginModalOpen}
              onClose={toggleLoginModal}
              onLogin={reCheckUserData}
            />
            <RegisterModal
              view={dimensions.view}
              visible={registerModalOpen}
              onClose={toggleRegisterModal}
              onRegister={reCheckUserData}
            />
          </>
      }
    </View>
  </>;
};


/* Toggles PWA Functionality */
if (process.env.REACT_APP_PWA === 'true') serviceWorkerRegistration.register();
else serviceWorkerRegistration.unregister();

export default App;
