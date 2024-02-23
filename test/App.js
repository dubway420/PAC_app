import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebase_creds"

// DONE
// Get just a couple of lines of description
// Coloured blocks for each item
// Colour backtround
// Date range
// Thumbnail

// TODO

// Press on event to see more info
// Pressing once expands
// Lists each sub-event
// Clicking on sub-event takes you to ticketsolve
// Should be option to get more info in the form of a dialogue box

// Sliding draw with buttons to toggle -
// 1. Cinema
// 2. Comedy
// 3. Music
// 4. Drama

// Time select
// Select time from to

// Order by
// 1. Date
// 2. Category
// 3. Alphabetical

// Calender view - click on the day

// Move styles to seperate page

// Status bar
// Title bar

// Make it refresh if dragged down


const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "events"));
      const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id,
                                                           desc: doc.data().description, 
                                                           company: doc.data().company, 
                                                           time_start: doc.data().time_earliest,
                                                           time_end: doc.data().time_latest,
                                                           image_thumb: doc.data().images[0]}));
      setData(fetchedData);
    };

    fetchData();
  }, []);

  // Get it to take two arguments (start, end) and return the full from - to string.
  // If start and end days are the same, return only one date
  const renderDate = (timestamp1, timestamp2) => {
    const formatDate = (timestamp) => {
      const date = new Date(timestamp.seconds * 1000);
  
      // Get the month name
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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
                                           elevation: 5  }} key={item.id}>
                  <View style={{flexDirection: "row"}}>


                    <Image
                      source={{ uri: item.image_thumb }}
                      style={{ width: 100, height: 100 }}
                    />


                    <View style={{flexDirection: "column", width: "75%", marginLeft: 5}}>                          
                      <Text style={{fontWeight: 'bold', marginBottom: 2, color: "white"}}>{item.id}</Text>
                      <Text style={{color: "white", marginBottom: 3}}>{item.desc.split(" ").slice(0, 20).join(' ').concat("...")}</Text>
                      <Text style={{fontWeight: 'bold', marginTop: 2, color: "white"}}>{renderDate(item.time_start, item.time_end)}</Text>
                    </View>
                  
                  </View>


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