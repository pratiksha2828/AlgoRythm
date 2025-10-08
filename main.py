from backend.popup import launch_popup
from backend.oauth import authenticate

def main():
    print("🔑 Starting OAuth login...")
    token = authenticate()

    if token:
        print("✅ Authenticated with GitHub")
        launch_popup(token)
    else:
        print("❌ Authentication failed")

if __name__ == "__main__":
    main()
