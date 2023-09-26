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
