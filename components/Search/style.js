import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    sticky:{
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    option:{
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EDF5FD',
        backgroundColor: '#EDF5FD',
    },
    optionSelected:{
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#00B2FF',
        backgroundColor: '#EDF5FD',
    },
    optionText:{
        fontSize: 13,
        fontWeight: '500',
    },
    newListContainer:{
        width: '100%',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center'
    },
    flatList:{
        flexDirection: 'column',
        flexGrow: 1,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemContainer:{
        flex: 1,
        width: '100%',
        flexGrow: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginLeft: 8,
        width: '95%',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        borderRadius: 8,
        position: "relative",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    detailsContainer: {
        width: '50%',
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    bottomInfo: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    author: {
        fontSize: 12,
        fontWeight: '500',
        color: '#797979',
    },
    publication: {
        fontSize: 12,
        fontWeight: '500',
        color: '#797979',
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    notfound: {
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }
});

export default styles;