from firebase_creds import get_firefox_database
from google.cloud.firestore_v1.base_query import FieldFilter
from datetime import datetime

events_ref = get_firefox_database()

# Define the cutoff date
cutoff_date = datetime(2024, 7, 20) 

# Define the end date
end_date = datetime(2024, 12, 15) 

# events = events_ref.where(filter=FieldFilter("capital", "==", True)).stream()
events = events_ref.where(filter=FieldFilter('time_earliest', '>=', cutoff_date)).where(filter=FieldFilter('time_earliest', '<=', end_date)).stream()



for event in events:

    print("\n")
    print(event.id)
    print("\n")

    events_dict = event.to_dict()

    sub_events = event.reference.collection("sub_events").stream()

    for sub_event in sub_events:
        print(sub_event.id)

    print("\n ---- \n")

