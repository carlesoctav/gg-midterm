import json
import re
from googleapiclient.discovery import build

# Replace with your own API key
API_KEY = ''

# Replace with the ID of the playlist you want to scrape
PLAYLIST_ID = 'PLVBiMJEKHHra4mka_fSWGLiXpaFbhr9oU'

# Create a YouTube API client
youtube = build('youtube', 'v3', developerKey=API_KEY)

# Retrieve the playlist items
playlist_items = []
next_page_token = None
while True:
    # Make a request to the API
    request = youtube.playlistItems().list(
        part='snippet',
        playlistId=PLAYLIST_ID,
        maxResults=50,
        pageToken=next_page_token
    )
    response = request.execute()

    # Add the items to the list
    playlist_items.extend(response['items'])

    # Check if there are more items
    next_page_token = response.get('nextPageToken')
    if not next_page_token:
        break

# Retrieve the video information
videos = []
for item in playlist_items:
    video_id = item['snippet']['resourceId']['videoId']
    video_title = item['snippet']['title']
    video_description = item['snippet']['description']

    # Search for a Tokopedia link in the description
    tokopedia_links = re.findall(r'https?://(?:www\.)?tokopedia\.link/\b\S{11}\b', video_description)
    if tokopedia_links:
        
        print(tokopedia_links)

        videos.append({
            'youtube_link': f'https://youtu.be/{video_id}',
            'thumbnail': f'https://i.ytimg.com/vi/{video_id}/hqdefault.jpg',
            'title': video_title,
            'tokopedia_links': tokopedia_links
        })

# Save the video information as a JSON file
with open('videos_10.json', 'w') as f:
    json.dump(videos, f)


