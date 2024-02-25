import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebase_creds"
import Icon from 'react-native-vector-icons/FontAwesome';
import { english, welsh } from './lang';

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

// TODO
// README
// move words to lang.js

// scrolling makes top bar minimise

// Tapping a tag - filter by tag
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

// Move styles to seperate page

// Status bar
// Title bar

// Make it refresh if dragged down
// Welsh/English Toggle

// Search feature
// Licence and copyright notice



const App = () => {
  const [data, setData] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const [lang, setLang] = useState(english)

  const monthNames = lang["months"]
  const tagNames = lang["tags"]

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "events"));
      const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id,
                                                           desc: doc.data().description, 
                                                           company: doc.data().company, 
                                                           time_start: doc.data().time_earliest,
                                                           time_end: doc.data().time_latest,
                                                           image_thumb: doc.data().images[0],
                                                           tags: doc.data().tags,
                                                           age: doc.data().Age_Rating
                                                          }));
      setData(fetchedData);
    };

    fetchData();
  }, []);


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

  const tagRenders = {

    cinema: (<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "red", borderRadius: 10, padding: 5, marginRight:5 }}> 
                <Icon name="play" size={15} color="white" />
                <Text style={{color: "white", marginLeft: 5}}>{tagNames["cinema"]} </Text>
              </View>),
  
    filmclub: (<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "blue", borderRadius: 10, padding: 5, marginRight:5}}> 
                <Icon name="film" size={15} color="white" />
                <Text style={{color: "white", marginLeft: 5}}>{tagNames["filmclub"]} </Text>
              </View>),
  
    music: (<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "green", borderRadius: 10, padding: 5, marginRight:5}}> 
                <Icon name="music" size={15} color="white" />
                <Text style={{color: "white", marginLeft: 5}}>{tagNames["music"]} </Text>
              </View>),
              
    panto: (<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "purple", borderRadius: 10, padding: 5, marginRight:5}}> 
              <Icon name="star" size={15} color="white" />
              <Text style={{color: "white", marginLeft: 5}}>{tagNames["panto"]} </Text>
            </View>),
  
    comedy: (<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#1a0e45", borderRadius: 10, padding: 5, marginRight:5}}> 
              <Icon name="exclamation" size={15} color="white" />
              <Text style={{color: "white", marginLeft: 5}}>{tagNames["comedy"]} </Text>
            </View>),
  
    poetry: (<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#c8b63b", borderRadius: 10, padding: 5, marginRight:5}}> 
              <Icon name="comment" size={15} color="white" />
              <Text style={{color: "white", marginLeft: 5}}>{tagNames["poetry"]} </Text>
            </View>),
  
    entertainment: (<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#c674d7", borderRadius: 10, padding: 5, marginRight:5}}> 
                      <Icon name="thumbs-up" size={15} color="white" />
                      <Text style={{color: "white", marginLeft: 5}}>{tagNames["entertainment"]} </Text>
                    </View>),
  
    family: (<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#0d7299", borderRadius: 10, padding: 5, marginRight:5}}> 
              <Icon name="child" size={15} color="white" />
              <Text style={{color: "white", marginLeft: 5}}>{tagNames["family"]} </Text>
            </View>),
  
    drama: (<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#e0b125", borderRadius: 10, padding: 5, marginRight:5}}> 
              <Icon name="quote-right" size={15} color="white" />
              <Text style={{color: "white", marginLeft: 5}}>{tagNames["drama"]} </Text>
            </View>),
  
  };

  const tag_render = (tags, id) => {

    
    const tag_list = tags.map(item => (
                                      <View key={item.concat(id)}> 
                                        {tagRenders[item]} 
                                      </View>
    ))


    return (<View style={{flexDirection: "row"}}> 
              {tag_list} 
            </View>)

  }

  const age_rating = (age) => {

    if (age === "18") {
      return <Image
                source={require('./assets/BBFC_18_rz.png')}
                style={{ width: 30, height: 30 }}/>

    } else if (age === "15") {
      return <Image
          source={require('./assets/BBFC_15_rz.png')}
          style={{ width: 30, height: 30 }}/>

    } else if (age === "12A") {
      return <Image
          source={require('./assets/BBFC_12A_rz.png')}
          style={{ width: 30, height: 30 }}/>

    } else if (age === "PG") {
      return <Image
          source={require('./assets/BBFC_PG_rz.png')}
          style={{ width: 35, height: 30 }}/>

    } else if (age === "U") {
      return <Image
          source={require('./assets/BBFC_U_rz.png')}
          style={{ width: 35, height: 30 }}/>

    } else if (age) {
      if (age.length <= 3){
        return <Text style={{fontWeight: 'bold', marginBottom: 2, color: "white", fontSize: 20}}>{age}</Text>
      }
    }

  }

  return (
    
      <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', alignItems: 'center',  backgroundColor: "#fec84d"}}>
        
        {data ? (

          <ScrollView style={{backgroundColor: "#fec84d"}}>
            <View style={{ flex: 1, flexDirection: "vertical", justifyContent: 'start', alignItems: 'start', marginTop: 30, backgroundColor: "#fec84d"}}>
              
              {data.map(item => (
              
                <TouchableOpacity style={{ flex: 1, width: "100%", alignItems: 'start', marginTop: 30, padding: 10, backgroundColor: "#00b1b0",   shadowColor: '#000',
                                           shadowOffset: { width: 0, height: 2 },
                                           shadowOpacity: 0.25,
                                           shadowRadius: 3.84,
                                           elevation: 5  }} key={item.id} onPress={() => toggleItem(item.id)}>
                  <View style={{flexDirection: "row"}}>


                    <Image
                      source={{ uri: item.image_thumb }}
                      style={{ width: 100, height: 100 }}
                    />


                    <View style={{flexDirection: "column", width: "75%", marginLeft: 5}}>                          
                      <Text style={{fontWeight: 'bold', marginBottom: 2, color: "white", fontSize: 20}}>{item.id}</Text>
                      <Text style={{fontWeight: 'bold', marginTop: 2, color: "white", marginBottom: 10}}>{renderDate(item.time_start, item.time_end)}</Text>
                      <View style={{flexDirection: "row"}}>
                        {tag_render(item.tags, item.id)}
                        {age_rating(item.age)}
                      </View>
                    </View>
                  
                  </View>

                  {expandedItem === item.id && (
                      <View>
                        <Text style={{color: "white", marginTop: 3}} >{item.desc.split(" ").slice(0, 20).join(' ').concat("...")}</Text>
              
                      </View>
                    )}

                </TouchableOpacity>

              ))}

            </View>
          </ScrollView>


        ) : (
          <Text style={{flex: 1, textAlign: 'center', backgroundColor: "#e42256", color: "white", fontSize: 30, padding: 5}}>{"Pontardawe \n Arts \n Centre"}</Text>
        )}

      </View>
    
  );
};

export default App;