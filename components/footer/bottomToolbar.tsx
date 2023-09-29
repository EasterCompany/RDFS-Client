import {View, ViewStyle} from 'react-native';


const BottomToolbar = ({view, children}) => {

  const container:ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: view.width,
    paddingTop: view.height * 0.01,
    paddingLeft: view.width * 0.01,
    paddingRight: view.width * 0.01,
    paddingBottom: view.height * 0.01,
    boxShadow: "1px 1px 10px black"
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
