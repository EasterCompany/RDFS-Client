// Library
import { View, Text, StyleSheet } from 'react-native';
// Components
import LinkBtn from '../buttons/link';
import TextBtn from '../buttons/text';


const NavMenuContent = () => <>
  <Header text="Directories"/>
  <Option text="All Files"/>
  <Option text="Pictures"/>
  <Option text="Videos"/>
  <Option text="Audio"/>
  <Option text="Games"/>
  <Option text="TV & Movies"/>
  <Option text="Documents" last/>
</>;


const Header = ({ text }) => <Text style={navMenu.header}>{text}</Text>;


const Link = ({ text, link, last }) => <LinkBtn
  text={text}
  link={link}
  style={[ navMenu.option, { borderBottomWidth: last ? 1 : 0 } ]}
  onHover={navMenu.optionHover}
>
  <Text style={navMenu.optionText}>{text}</Text>
</LinkBtn>


const Option = ({ text, last }) => <TextBtn
  text={text}
  style={[ navMenu.option, { borderBottomWidth: last ? 1 : 0 } ]}
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
