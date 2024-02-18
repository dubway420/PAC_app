from firebase_creds import get_firefox_database
from google.cloud.firestore_v1.base_query import FieldFilter

events_ref = get_firefox_database()

events = events_ref.where(filter=FieldFilter("category", "==", 'Panto')).stream()



for event in events:

    print("\n")
    print(event.id)
    print("\n")
    print(event.to_dict()["description"])
    print("\n ---- \n")
