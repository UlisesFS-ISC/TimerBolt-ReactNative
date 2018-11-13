import {
  StyleSheet
} from "react-native";

import {
  STYLE_THEMES
} from "../../utils/style-constants";

const getModalStyles = (theme = 'sky') => {
  return StyleSheet.create({
    largeModalContainer: {
        flexDirection: "row",
        flexWrap:'wrap',
        alignContent: "space-around",
        marginTop: '7%',
        padding: 8,
        margin: 10,
        backgroundColor: STYLE_THEMES[theme].primaryBackground
      },
      modalContainer: {
        flexDirection: "column",
        marginTop: '30%',
        padding: 10,
        margin: 10,
        opacity: 1,
        backgroundColor: STYLE_THEMES[theme].primaryBackground
      },
      overlay: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.5,
        zIndex: 1000,
        backgroundColor: "gray"
      },
      modalHeader:{
        flexDirection: "row",
        flexWrap:'wrap',
        alignContent: "center",
        padding: 5,
        margin: 10,
      },
      modalHeaderText: {
        fontWeight: "400",
        color: STYLE_THEMES[theme].inputFontColor,
        fontSize: 22
      },
      modalEntryDescription:{     
        flexDirection: "column",
        height: "50%",
        margin: 20,
      },
      modalNavigationActions: {
        flexDirection: "row",
        flexGrow: 2,
        justifyContent: "space-between",
        padding: 20,
        marginTop: 25
      },
       modalFormRow: {
        flexDirection: "row",
        alignItems: "stretch",
        marginTop: 20
      },
       modalFormColumn: {
        flexDirection: "column",
        alignItems: "stretch",
        marginRight: 8
      },
      modalText: {
        fontWeight: "100",
        color: STYLE_THEMES[theme].inputFontColor,
        fontSize: 16
      },
      modalFormTextInputs: {
        flexDirection: "column",
      },
      modalInputFieldContainer: {
        backgroundColor: STYLE_THEMES[theme].inputBackgroundColor,
        height: 30,
        width: '90%',
        margin: 8
      },
      modalBoldText: {
        fontWeight: "400",
        color:  STYLE_THEMES[theme].inputFontColor,
        fontSize: 16
      },
      modalLabel: {
        fontWeight: "400",
        color:  STYLE_THEMES[theme].labelFontColor,
        fontSize: 16
      },
      modalCheckBoxGroupItem: {
        justifyContent: "space-between",
        margin: 6,
        width: 140
      },
       modalPicker: {
        flexDirection: "column",
        margin: 10,
        justifyContent: "flex-start"
      }
    });
};

export default getModalStyles;