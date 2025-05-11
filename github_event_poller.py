import os
import json
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

GITHUB_API_URL = "https://api.github.com"
REPO_OWNER = os.getenv("GITHUB_OWNER")
REPO_NAME = os.getenv("GITHUB_REPO")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

EVENTS_FILE = ".github/events/latest-event.json"
PROCESSED_FILE = ".github/events/last-processed-event.txt"

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

def fetch_push_events():
    url = f"{GITHUB_API_URL}/repos/{REPO_OWNER}/{REPO_NAME}/events"
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

def get_last_processed_commit():
    if os.path.exists(PROCESSED_FILE):
        with open(PROCESSED_FILE, "r") as f:
            return f.read().strip()
    return None

def save_last_processed_commit(commit_sha):
    with open(PROCESSED_FILE, "w") as f:
        f.write(commit_sha)

def handle_push_event(event):
    os.makedirs(os.path.dirname(EVENTS_FILE), exist_ok=True)
    with open(EVENTS_FILE, "w") as f:
        json.dump(event, f, indent=2)
    print(f"✅ New push event handled for commit: {event['payload']['after']}")

def main():
    try:
        events = fetch_push_events()
        last_processed = get_last_processed_commit()

        for event in events:
            if event.get("type") == "PushEvent":
                current_commit = event["payload"]["after"]

                if current_commit == last_processed:
                    print(f"⏩ Skipping already processed commit: {current_commit}")
                    break

                handle_push_event(event)
                save_last_processed_commit(current_commit)
                break  # Handle only the latest unprocessed push event
        else:
            print("ℹ️ No new push events found.")

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()
