import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from bs4 import BeautifulSoup
from bs4.element import Comment
import numpy as np
import requests
from dateutil import parser
import pandas as pd
from html.parser import HTMLParser


url = "https://pontardaweartscentre.ticketsolve.com/shows.xml"

xml_data = requests.get(url).content

soup = BeautifulSoup(xml_data, features="xml")

shows = soup.find_all("show")

# Use a service account.
cred = credentials.Certificate('./ponty-arts-centre-firebase-adminsdk-a17x6-6eea0a92c2.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()


events_ref = db.collection("events")

for show in shows:

    # Name
    show_name = show.find("name").text.strip()
    show_ref = events_ref.document(show_name)

    meta_data = {}

    # Description
    meta_data['description'] = show.find("description").text

    # Category
    meta_data['category'] = show.find("event_category").text

    # Companies
    meta_data['company'] = show.find("production_company_name").text

    # url
    meta_data['url'] = show.find("url").text

    # Images
    images = []
    images_tags = show.images.find_all("url")
    for image in images_tags:
        images.append(image.text)

    meta_data['images'] = images

    # tags
    show_tags = []
    for tag in show.find("tags").find_all("tag"):
        show_tags.append(tag.text)

    meta_data['tags'] = show_tags

    # Properties
    show_properties = show.find("properties").find_all("property")

    property_pd = {}

    for property in show_properties:

        meta_data[property.find("name").text] = property.value.text


    # Sub events
    sub_events_tags = show.events.find_all("event")

    sub_events_ref = show_ref.collection("sub_events")

    for event in sub_events_tags:

        sub_event_ref = sub_events_ref.document(event.find("name").text)

        sub_event_ref.set({

            'start_time': parser.parse(event.find("date_time_iso").text.strip()),
            'opening_time': parser.parse(event.find("opening_time_iso").text.strip()),
            'url': event.find("url").text,

        })

    show_ref.set(meta_data)
