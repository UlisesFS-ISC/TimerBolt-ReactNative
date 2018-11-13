import {
    StyleSheet
  } from "react-native";
  
  import {
    STYLE_THEMES
  } from "../utils/style-constants";
  
  const getModalStyles = (theme = 'sky') => {
    return StyleSheet.create({
        screenContainer: {
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
            padding: 20,
            paddingTop:30,
            backgroundColor:'white',
            height: "120%"
        },
        genericScreen:{
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        },
        title: {
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 24
        },
      
        footerSection: {
          fontWeight: "100",
          color: STYLE_THEMES[theme].labelFontColor,
          fontSize: 16
        },
        iconFont_sm: {
          color: 'white',
          fontSize: 16
        },
        iconFont_lg: {
          color: 'white',
          fontSize: 24
        },
        header: {
          backgroundColor:'dodgerblue'
       }
      });
  };
  export default getModalStyles;