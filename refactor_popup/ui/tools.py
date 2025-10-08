# tools/cleanup_unused.py
"""
Heuristic cleaner: lists files that are likely unused (not imported/referenced).
This is conservative; manual review is recommended.
"""
import os, sys, re
from pathlib import Path
from collections import defaultdict

def collect_py_imports(root: Path):
    imports = set()
    for p in root.rglob("*.py"):
        try:
            txt = p.read_text(errors="ignore")
        except Exception:
            continue
        for m in re.finditer(r'^\s*(?:from\s+([\w\.]+)\s+import|import\s+([\w\.]+))', txt, flags=re.M):
            mod = m.group(1) or m.group(2)
            if mod:
                imports.add(mod.split('.')[0])
    return imports

def main():
    root = Path(sys.argv[1] if len(sys.argv)>1 else ".").resolve()
    ex_dirs = {".git", "node_modules", ".venv", "venv", "__pycache__", "dist", "build"}
    files = [p for p in root.rglob("*") if p.is_file() and not any(d in p.parts for d in ex_dirs)]
    py_imports = collect_py_imports(root)
    candidates = []
    for p in files:
        if p.suffix in {".png",".jpg",".jpeg",".gif",".map",".lock",".md",".txt",".json",".yaml",".yml",".env",".ini",".log"}:
            continue
        if p.suffix == ".py":
            try:
                txt = p.read_text(errors="ignore")
            except Exception:
                continue
            name = p.stem
            if name not in py_imports and "__main__" not in txt:
                candidates.append(str(p.relative_to(root)))
    print("Likely-unused Python files (heuristic):")
    for c in candidates:
        print(c)
    if "--delete" in sys.argv:
        ans = "y"
        for c in candidates:
            p = root / c
            try:
                p.unlink()
                print(f"DELETED {c}")
            except Exception as e:
                print(f"FAILED {c}: {e}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
