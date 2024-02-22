import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebase_creds"

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "events"));
      const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, desc: doc.data().description, company: doc.data().company }));
      setData(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
        {data ? (
          data.map(item => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }} key={item.id}>
              <Text style={{fontWeight: 'bold'}}>{item.id}</Text>
              <Text>{item.desc}</Text>
            </View>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default App;