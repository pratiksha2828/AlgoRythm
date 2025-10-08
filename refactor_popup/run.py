# refactor_popup/run.py
import os, argparse, webbrowser, threading
import uvicorn
from .server import app

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", default=".", help="Path to repo to analyze")
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args()
    os.environ["REPO_PATH"] = os.path.abspath(args.repo)
    url = f"http://127.0.0.1:{args.port}/ui"
    def open_browser():
        webbrowser.open(url)
    threading.Timer(1.0, open_browser).start()
    uvicorn.run(app, host="127.0.0.1", port=args.port)
if __name__ == "__main__":
    main()
