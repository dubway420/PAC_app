import { StyleSheet } from 'react-native';

// You should be able to modify most of the look and feel of the app through this file.
// Each "element" i.e. thing in the app is styled via on of the style objects.
// Each style object has several attributes which can be modified.

// justifyContent and alignItems attributes controls the position of 'child' items 
// Take a look at this website if you get stuck - https://reactnative.dev/docs/layout-props

// margin - the space around an item
// padding - the spacew within an item
// If you get stuck take a look at my YouTube video here (18m: 53s) - https://www.youtube.com/watch?v=LGZ2AdZL6u4&t=1047s 

// backgroundColour - self explanatory, can be a simple word in inverted commas ("red", "white") or a hex code in inverted commas
// color - colour of the text

// flexDirection - this is just the direction items within the element are listed

export const styles = StyleSheet.create({
    
    // TAGS ---------------------------------------------
    // The tag buttons that comprise an icon and the text
    tagButton: {
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        borderRadius: 10, 
        padding: 5, 
        marginRight:5 
    },

    // This is the text of the tags
    tagText: {
        color: "white", 
        marginLeft: 5
    },


    // AGE RATING TAGS ----------------------------------
    // 18, 15, 12a
    ageRatingImage: {
        width: 30, 
        height: 30 
    },

    // U and PG
    ageRatingImageUPG: {
        width: 35, 
        height: 30 
    },

    // Text only
    ageRatingText: {
        fontWeight: 'bold', 
        marginBottom: 2, 
        color: "white", 
        fontSize: 20
    },


    // Main page ----------------------------------------
    mainPageBackground: { 
        flex: 1, 
        flexDirection: "row", 
        justifyContent: 'center', 
        alignItems: 'center',  
        backgroundColor: "#fec84d"
    },

    // Gap for the status bar
    statusBarGap: {
        paddingTop: 25
    },


    // Top Bar ------------------------------------------
    topBar: {
        colors: ['#e42256', '#ff8370'],
        start: { x: 0, y: 0 },
        end: { x: 0.75, y: 1 },
        style: { 
            flexDirection: "row", 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: 3
        }

    },

    // App name/Title
    title: {
        marginLeft: 4, 
        color: "white", 
        fontWeight: "bold", 
        borderBottomWidth: 1, 
        borderColor: "black"
    }, 

    // Button bar
    topBarButtons: {
        flexDirection: "row"
    },

    // The button itself
    topBarButton: {
        backgroundColor: "grey", 
        marginRight: 5, 
        borderRadius: 8
    },

    // The icons within the button
    topBarButtonIcon: {
        size: 25,
        color: "white",
        style: {padding: 4}

    },


    // Main Events feed ------------------------------------------

    // The main background (scrollview)
    eventsBackground: { 
        backgroundColor: "#fec84d" 
    },

    // the box inside the scrollview that contains the actual event listings
    eventsList: { 
        flex: 1, 
        flexDirection: "vertical", 
        justifyContent: 'start', 
        alignItems: 'start', 
        marginTop: 5, 
        backgroundColor: "#fec84d" 
    },


    // Event items ----------------------------------------------

    // The outer most part of the event items
    eventItemSurround: {
        colors: ['red', '#20b2aa'],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },

        style: {
            flex: 1, 
            width: "100%", 
            alignItems: 'start', 
            marginBottom: 30, 
            padding: 10, 
            backgroundColor: "#00b1b0",
            
            // HRJ: I've tried to add some styling to each item, not sure how well it works on android/iOS  
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
        }},

    // just a block around eveything
    eventBlock: { 
        flexDirection: "row" 
    },

    // The thumbnail image of the event
    eventImageThumb: {
        width: 100, 
        height: 100 
    },

    // the block around the event info
    eventInfoBlock: { 
        flexDirection: "column", 
        width: "75%", 
        marginLeft: 5 
    },

    // The title of the event
    eventName: { 
        fontWeight: 'bold', 
        marginBottom: 2, 
        color: "white", 
        fontSize: 20 
    },

    // The data range bar
    eventDate: { 
        fontWeight: 'bold', 
        marginTop: 2, 
        color: "white", 
        marginBottom: 10 
    },

    // Just a box around the tags
    eventTagsBox: { 
        flexDirection: "row" 
    },

    // A description of the event
    eventDesc: { 
        color: "white", 
        marginTop: 3 
    },

    // The more info button
    moreInfoButton: {
        color: "#6b5f33",

    },


    // The bottom bar -----------------------------------------------------
    
    bottomBarActual: {
        colors: ['#ff8370', '#ff8370'],        
        start: { x: 0, y: 0 },
        end: { x: 0.75, y: 1 },
        style: {flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', padding: 3}
    },

    bottomBarScroll: {
        padding: 5, 
        height: 40
    },


    // Splash screen -----------------------------------------------------
    splashScreen: {
        flex: 1, 
        textAlign: 'center', 
        backgroundColor: "#e42256", 
        color: "white", 
        fontSize: 30, 
        padding: 5
    },



  });