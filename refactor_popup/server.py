# refactor_popup/server.py
import os, io, json, re, base64
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import List, Dict, Any
from .providers import default_chain, language_from_filename

app = FastAPI(title="Refactor Popup")

ROOT = Path(os.getenv("REPO_PATH", "."))

app.mount("/ui", StaticFiles(directory=str((Path(__file__).parent / "ui").resolve()), html=True), name="ui")

class AnalyzeRequest(BaseModel):
    repo_path: str = "."
    max_files: int = 30
    include_exts: List[str] = []
    exclude_dirs: List[str] = [".git","node_modules",".venv","venv","dist","build","__pycache__"]

def iter_files(root: Path, include_exts: List[str], exclude_dirs: List[str]):
    for p in root.rglob("*"):
        if p.is_dir():
            if any(part in exclude_dirs for part in p.parts):
                continue
            else:
                continue
        if any(part in exclude_dirs for part in p.parts):
            continue
        if include_exts:
            if not any(str(p).endswith(e) for e in include_exts):
                continue
        yield p

def head(p: Path, n=8000):
    try:
        return p.read_text(errors="ignore")[:n]
    except Exception:
        return ""

@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    root = Path(req.repo_path).resolve()
    if not root.exists():
        raise HTTPException(404, "repo_path not found")
    include_exts = req.include_exts or [".py",".js",".ts",".java",".go",".rs",".cpp",".c",".cs",".kt",".swift"]
    chain = default_chain()
    results: Dict[str, Dict[str,str]] = {}
    file_count = 0
    for p in iter_files(root, include_exts, req.exclude_dirs):
        if file_count >= req.max_files: break
        code = head(p, n=20000)
        if not code.strip(): 
            continue
        lang = language_from_filename(p.name)
        refactored = explained = traced = None
        for prov in chain:
            if refactored is None:
                refactored = prov.refactor(code, p.name, lang)
            if explained is None:
                explained = prov.explain(code, p.name, lang)
            if traced is None:
                traced = prov.trace_core_logic(code, p.name, lang)
        if refactored is None:
            refactored = code
        if explained is None:
            explained = f"# Overview\nThis file '{p.name}' is written in {lang}. (LLM explanation unavailable)\n\n# Key Components\n- Lines: {len(code.splitlines())}\n"
        if traced is None:
            traced = "- Core logic could not be auto-traced by LLM. Review manually."
        results[str(p.relative_to(root))] = {
            "refactored": refactored,
            "explanation": explained,
            "trace": traced
        }
        file_count += 1
    return {"root": str(root), "count": file_count, "files": results}

@app.get("/", response_class=HTMLResponse)
def root_page():
    index = (Path(__file__).parent / "ui" / "index.html").read_text()
    return HTMLResponse(index)
