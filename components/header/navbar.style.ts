import { StyleSheet, Platform } from 'react-native';


const header:any = StyleSheet.create({

  container: {
    zIndex: 999,
    verticalAlign: 'middle',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: 52,
    marginTop: Platform.OS === 'ios' ? 32 : 0,
    paddingLeft: 24,
    paddingRight: 24,
    borderWidth: 1,
    borderColor: '#ffffff33',
    borderWidth: Platform.OS === 'web' ? 0 : 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    boxShadow: '1px 1px 5px #00000066',
    backgroundColor: '#202029'
  },

  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34
  },

});


export default header;
