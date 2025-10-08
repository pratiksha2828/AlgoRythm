import os
import shutil

def load_repo_code(repo_path):
    code_files = {}
    for root, _, files in os.walk(repo_path):
        for f in files:
            if f.endswith((".py", ".js", ".ts", ".java", ".cpp", ".c", ".html", ".css")):
                full = os.path.join(root, f)
                with open(full, "r", errors="ignore") as fh:
                    code_files[full.replace(repo_path, ".")] = fh.read()
    return code_files

def detect_ai_backend():
    if shutil.which("gems"):
        print("[INFO] Using Gemini Gems as AI backend")
        return "gems"
    elif shutil.which("ollama"):
        print("[INFO] Using Ollama as AI backend")
        return "ollama"
    elif os.getenv("OPENAI_API_KEY"):
        print("[INFO] Using OpenAI as AI backend")
        return "openai"
    else:
        raise RuntimeError("No AI backend detected (need gems, ollama, or OPENAI_API_KEY)")
