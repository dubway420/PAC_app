import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def get_firefox_database(target='events'):
    cred = credentials.Certificate('./ponty-arts-centre-firebase-adminsdk-a17x6-2db3f5c92a.json')

    app = firebase_admin.initialize_app(cred)

    db = firestore.client()

    return db.collection(target)