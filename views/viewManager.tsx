// Components
import Browser from '../components/fileBrowser/browser';
// Library
import { ScrollView, View } from 'react-native';
// Styles
import theme from '../App.style';


const ViewManager = ({ view } : any) => {
  return <ScrollView
    style={{
      width: view.width,
      height: view.height,
      backgroundColor: '#202029'
    }}
    contentContainerStyle={{
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: view.width
    }}
  >
    <Browser view={view}/>
  </ScrollView>
};


export default ViewManager;
