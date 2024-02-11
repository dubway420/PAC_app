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

names = []
descriptions = []
categories = []
companies = []
urls = []
properties = []
show_images = []
sub_events = []
tags = []
venue_layouts = []


for show in shows:

    # Name
    show_name = show.find("name").text.strip()
    names.append(show_name)


    # Description
    description = show.find("description").text
    descriptions.append(BeautifulSoup(description, 'html.parser').get_text(separator=' ', strip=True))


    # Category
    category = show.find("event_category").text
    categories.append(category)


    # Companies
    company = show.find("production_company_name").text
    companies.append(company)


    # url
    url = show.find("url").text
    urls.append(url)


    # Images
    images = []
    images_tags = show.images.find_all("url")
    for image in images:
        images.append(image.text)

    show_images.append(images)


    # Tags
    show_tags = []
    for tag in show.find("tags").find_all("tag"):
        show_tags.append(tag.text)

    tags.append(show_tags)

    # Properties
    show_properties = show.find("properties").find_all("property")

    property_pd = {
        "Running Time": "",
        "Age Rating": "",
        "video": ""
    }

    for property in show_properties:

        property_pd[property.find("name").text] = property.value.text

    properties.append(property_pd)


    # Sub events
    sub_events_tags = show.events.find_all("event")

    sub_events_show = []
    for event in sub_events_tags:
        sub_events_show.append({

            'start_time': parser.parse(event.find("date_time_iso").text.strip()),
            'opening_time': parser.parse(event.find("opening_time_iso").text.strip()),
            'url': event.find("url").text,

        })

    sub_events.append(sub_events_show)


    # Venue layout

    venue_layout = event.find("venue_layout").text
    venue_layouts.append(venue_layout)


final_data = pd.DataFrame(data={'names': names,
                                'description': descriptions,
                                'categories': categories,
                                'companies': companies,
                                'url': urls,
                                'properties': properties,
                                'images': show_images,
                                'subevents': sub_events,
                                'tags': tags,
                                'venue_layouts': venue_layouts
                                })


final_data.to_pickle('./index.pkl')
