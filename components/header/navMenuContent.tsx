// Library
import {View, Text, StyleSheet, ViewStyle, NativeEventEmitter} from 'react-native';
// Components
import LinkBtn from '../buttons/link';
import TextBtn from '../buttons/text';


const NavMenuContent = () => {
  const eventEmitter = new NativeEventEmitter();

  const setView = (view:string) => {
    eventEmitter.emit("navMenuChangeView", view);
    eventEmitter.emit("closeStaticUI", null);
  };

  return <>
    <Header text="Directories"/>
    <Option text="All Files" onPress={() => setView('browser')}/>
    <Option text="Pictures" onPress={() => setView('browser:pictures')}/>
    <Option text="Videos" onPress={() => setView('browser:videos')}/>
    <Option text="Audio" onPress={() => setView('browser:audio')}/>
    <Option text="Games" onPress={() => setView('browser:games')}/>
    <Option text="TV & Movies" onPress={() => setView('browser:tv&movies')}/>
    <Option text="Documents" onPress={() => setView('browser:documents')} last/>
  </>;
};


const Header = ({text}:any) => <Text style={navMenu.header}>{text}</Text>;


const Link = ({text, link, last}:any) => <LinkBtn
  text={text}
  link={link}
  style={[ navMenu.option, { borderBottomWidth: last ? 1 : 0 } ]}
  onHover={navMenu.optionHover}
>
  <Text style={navMenu.optionText}>{text}</Text>
</LinkBtn>


type Option = {
  text: string,
  onPress: () => void,
  last: boolean
};


const Option = ({text, onPress, last}:Option) => <TextBtn
  text={text}
  style={[ navMenu.option, { borderBottomWidth: last ? 1 : 0 } ]}
  onPress={onPress}
  onHover={navMenu.optionHover}
>
  <Text style={navMenu.optionText}>{text}</Text>
</TextBtn>


const navMenu = StyleSheet.create({

  header: {
    userSelect: 'none',
    color: 'rgba(200,200,200,1)',
    fontSize: 18,
    fontFamily: 'Metro',
    marginTop: 32,
    marginLeft: 18,
    marginRight: 'auto',
    marginBottom: 18
  },

  option: {
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 64,
    fontSize: 24,
    margin: 0,
    borderWidth: 1,
    borderColor: '#ffff',
    borderRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: 'rgba(0,0,0,0)'
  },

  optionHover: {
    backgroundColor: 'rgba(175,175,175,0.25)'
  },

  optionText: {
    userSelect: 'none',
    color: '#ffff',
    fontSize: 16,
    fontFamily: 'Metro'
  }

});


export default NavMenuContent;
