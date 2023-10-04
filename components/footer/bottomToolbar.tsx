import {View, ViewStyle, Platform} from 'react-native';


const BottomToolbar = ({view, children}) => {

  const container:ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: view.width,
    height: 64,
    borderColor: '#ffffff33',
    borderWidth: Platform.OS === 'web' ? 0 : 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    boxShadow: '-1px -1px 5px #00000066',
    backgroundColor: '#202029'
  };

  const innerContainer:ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 980
  };

  return <View style={container}>
    <View style={innerContainer}>
      {children}
    </View>
  </View>;
};


export default BottomToolbar;
