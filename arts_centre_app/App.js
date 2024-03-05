import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { getFirestore, collection, getDocs, disableNetwork } from "firebase/firestore";
import { app } from "./firebase_creds"
import Icon from 'react-native-vector-icons/FontAwesome';
import { english, welsh } from './lang';
import {LinearGradient} from 'expo-linear-gradient';
import { tag_attributes } from './constants';
import { styles } from './styles';
import Spinner from 'react-native-loading-spinner-overlay';

// DONE
// Get just a couple of lines of description
// Coloured blocks for each item
// Colour backtround
// Date range
// Thumbnail
// Press on event to see more info
// Pressing once expands
// Should be option to get more info in the form of a dialogue box
// Make title text bigger
// Remove desc from main item
// Tags etc in main item 
// README
// move words to lang.js
// Move styles to seperate page
// Status bar
// Title bar
// Tapping a tag - filter by tag

// TODO

// 
// On press:
// 1. Small Desc 
// 2. Lists each sub-event

// Clicking on sub-event takes you to ticketsolve

// Sliding draw with buttons to toggle -
// 1. Cinema
// 2. Comedy
// 3. Music
// 4. Drama

// Time select
// Select time from to
// Calender view - click on the day

// Order by
// 1. Date
// 2. Category
// 3. Alphabetical


// Make it refresh if dragged down
// Welsh/English Toggle

// Search feature
// Licence and copyright notice

// scrolling makes top bar minimise



const App = () => {

  const [data, setData] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const [lang, setLang] = useState(english)

  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  const [filterTag, setFilterTag] = useState(null)
  const monthNames = lang["months"]
  const tagNames = lang["tags"]
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true);

    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "events"));

    const fetchedData = await Promise.all(querySnapshot.docs.map(async doc => {
        const subEventsSnapshot = await getDocs(collection(db, "events", doc.id, "sub_events"));
        const subEvents = subEventsSnapshot.docs.map(subDoc => subDoc.data());

        return {
            id: doc.id,
            desc: doc.data().description,
            company: doc.data().company,
            time_start: doc.data().time_earliest,
            time_end: doc.data().time_latest,
            image_thumb: doc.data().images[0],
            tags: doc.data().tags,
            age: doc.data().Age_Rating,
            sub_events: subEvents
        };

    }));

    let filteredData;

    if (filterTag) {
        filteredData = fetchedData.filter(item => item.tags.includes(filterTag));
    } else {
        filteredData = fetchedData;
    }

    setData(filteredData);
    setLoading(false);
};

  useEffect(() => {

    console.log("use effect")

    fetchData();
  }, [filterTag]);


  const toggleItem = (itemId) => {
    setExpandedItem(itemId === expandedItem ? null : itemId);
  };


  const renderDate = (timestamp1, timestamp2) => {
    const formatDate = (timestamp) => {
      const date = new Date(timestamp.seconds * 1000);
  
      // Get the month name
      const month = monthNames[date.getMonth()];
  
      // Get the day with suffix
      let day = date.getDate();
      let suffix = 'th';
      if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
      } else if (day === 2 || day === 22) {
        suffix = 'nd';
      } else if (day === 3 || day === 23) {
        suffix = 'rd';
      }
  
      // Get the year (last two digits)
      const year = date.getFullYear().toString().slice(-2);
  
      return `${day}${suffix} ${month} ${year}`;
    };
    
    const date_earlier = formatDate(timestamp1)
    const date_latter = formatDate(timestamp2) 

    if (date_earlier == date_latter){
      return date_earlier
    }

    return [formatDate(timestamp1) + " - " + formatDate(timestamp2)];

  };


  filter_events = (filter_name, type="tag") => {

    
    if (type == "tag") {
      if (filter_name === "all") {

        setFilterTag(null)
        return
      }

      setFilterTag(filter_name)

    }

  }


  const tag_render = (tags, id, h=32, bottomBar=false) => {

    const validTags = tags.filter(tag => tag_attributes[tag]);
    const tag_list = validTags.map(item => {

      const additionalStyles = (item === filterTag && bottomBar) ? styles.tagSelected : {};    

      return (
        
        <View key={item.concat(id)}> 

          <TouchableOpacity onPress={() => filter_events(item)} style={[styles.tagButton, {backgroundColor: tag_attributes[item][1], height: h}, additionalStyles]}> 
            <Icon name={tag_attributes[item][0]} size={h/1.75} color="white" />
            <Text style={[styles.tagText, {fontSize: h/1.75}]}>{tagNames[item]} </Text>
          </TouchableOpacity>
        </View>)
  })


    return (<View style={{flexDirection: "row"}}> 
              {tag_list} 
            </View>)

  }


  const age_rating = (age) => {

    if (age === "18") {
      return <Image
                source={require('./assets/BBFC_18_rz.png')}
                style={styles.ageRatingImage}/>

    } else if (age === "15") {
      return <Image
          source={require('./assets/BBFC_15_rz.png')}
          style={styles.ageRatingImage}/>

    } else if (age === "12A") {
      return <Image
          source={require('./assets/BBFC_12A_rz.png')}
          style={styles.ageRatingImage}/>

    } else if (age === "PG") {
      return <Image
          source={require('./assets/BBFC_PG_rz.png')}
          style={styles.ageRatingImageUPG}/>

    } else if (age === "U") {
      return <Image
          source={require('./assets/BBFC_U_rz.png')}
          style={styles.ageRatingImageUPG}/>

    } else if (age) {
      if (age.length <= 3){
        return <Text style={styles.ageRatingText}>{age}</Text>
      }
    }

  }


  const scrolling = (event) => {

    const currentScrollPosition = event.nativeEvent.contentOffset.y;
    console.log(currentScrollPosition)

    if (currentScrollPosition <= 0) {
      setScrollDirection('up')
      return
    }

    if (currentScrollPosition > lastScrollPosition) {

      setScrollDirection('down');
    } 
    // else if (currentScrollPosition <= lastScrollPosition) {

    //   setScrollDirection('up');
    // }

    setLastScrollPosition(currentScrollPosition);

  }


  const sub_events_parser = (sub_events) => {

    // Get date objects for each sub_event 
    const start_dates = sub_events.map(event => new Date(event.start_time.seconds * 1000))
    const day_month = start_dates.map(date => [date.getDay(), date.getMonth()])

    console.log(day_month)
    

    // for (let i = 0; i < sub_events.length; i++) {

    //   const date = new Date(sub_events[i].start_time.seconds * 1000);
      

    // }

  }

  return (
    
      <View style={styles.mainPageBackground}>
        
        {data ? (

          <View style={{paddingTop: 25}}>

            <Spinner
              visible={loading}
              // textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />


            <LinearGradient
                  colors={styles.topBar.colors}
                  start={styles.topBar.start}
                  end={styles.topBar.end}
                  style={styles.topBar.style}
                >

                  <Text style={styles.title}>{"Pontardawe \nArts Centre"}</Text>
                  <View style={styles.topBarButtons}>

                    <TouchableOpacity style={styles.topBarButton}>
                      <Icon name="search" size={styles.topBarButtonIcon.size} color={styles.topBarButtonIcon.color} style={styles.topBarButtonIcon.style} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.topBarButton}>
                      <Icon name="calendar" size={styles.topBarButtonIcon.size} color={styles.topBarButtonIcon.color} style={styles.topBarButtonIcon.style} />
                    </TouchableOpacity>

                  </View>

            </LinearGradient> 



              <ScrollView 
                      // onScroll={scrolling} scrollEventThrottle={1} 
                      style={styles.eventsBackground}>

              <View style={styles.eventsList}>

                {data.map(item => (

                  <TouchableOpacity style={styles.eventItemSurround} key={item.id} onPress={() => toggleItem(item.id)}>

                    <View style={styles.eventBlock}>


                      <Image
                        source={{ uri: item.image_thumb }}
                        style={styles.eventImageThumb} />


                      <View style={styles.eventInfoBlock}>
                        <Text style={styles.eventName}>{item.id}</Text>
                        <Text style={styles.eventDate}>{renderDate(item.time_start, item.time_end)}</Text>
                        <View style={styles.eventTagsBox}>
                          {tag_render(item.tags, item.id)}
                          {age_rating(item.age)}
                        </View>
                      </View>

                    </View>

                    {expandedItem === item.id && (
                      <View>
                        <Text style={styles.eventDesc}>{item.desc.split(" ").slice(0, 20).join(' ').concat("...")}</Text>
                        <Text style={styles.moreInfoButton}>[More Info]</Text>
                        {sub_events_parser(item.sub_events)}

                        

                        {/* {console.log(item.sub_events)} */}

                      </View>
                    )}

                  </TouchableOpacity>
                
                ))}

              </View>
            
            </ScrollView>

            <LinearGradient
                  colors={styles.bottomBarActual.colors}
                  start={styles.bottomBarActual.start}
                  end={styles.bottomBarActual.end}
                  style={styles.bottomBarActual.style}
                >

              <ScrollView horizontal={true} style={[styles.bottomBarScroll]}>
                          {tag_render(Object.keys(tag_attributes), "bar", styles.bottomBarActual.tagHeight, true)}
              </ScrollView>
            </LinearGradient>

          </View>

          ) : (

            // The splash screen

              
              <Text style={styles.splashScreen}>{"Pontardawe \n Arts \n Centre"}</Text>



          )}

      </View>
    
  );
};

export default App;