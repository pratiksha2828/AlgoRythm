# refactor_popup/providers.py
import os
import json
import requests
from typing import Optional, List

class ProviderError(Exception):
    pass

class RefactorProvider:
    def refactor(self, code: str, filename: str, language: str) -> Optional[str]:
        raise NotImplementedError
    def explain(self, code: str, filename: str, language: str) -> Optional[str]:
        raise NotImplementedError
    def trace_core_logic(self, code: str, filename: str, language: str) -> Optional[str]:
        raise NotImplementedError

class OllamaProvider(RefactorProvider):
    def __init__(self, model: str = None, host: str = None):
        self.host = host or os.getenv("OLLAMA_HOST", "http://localhost:11434")
        self.model = model or os.getenv("OLLAMA_MODEL", "qwen2.5-coder:7b")
    def _complete(self, prompt: str) -> Optional[str]:
        try:
            resp = requests.post(f"{self.host}/api/generate", json={
                "model": self.model,
                "prompt": prompt,
                "stream": False
            }, timeout=120)
            if resp.status_code == 200:
                data = resp.json()
                return data.get("response")
        except Exception:
            return None
        return None
    def refactor(self, code, filename, language):
        p = f"You are a senior engineer. Refactor the following {language} code with best practices. Return ONLY code, no commentary.\nFILE: {filename}\n\n```{language}\n{code}\n```"
        return self._complete(p)
    def explain(self, code, filename, language):
        p = f"Explain, concisely but thoroughly, what this {language} file does. Structure with headings: Overview, Key Components, Important Functions/Classes, How it works step-by-step, Risks/Smells, Suggestions.\nFILE: {filename}\n\n```{language}\n{code}\n```"
        return self._complete(p)
    def trace_core_logic(self, code, filename, language):
        p = f"Extract the core logic (algorithms, critical paths, side effects) from this {language} file. Provide ordered bullets (1., 2., ...) and code snippets. Keep it precise.\nFILE: {filename}\n\n```{language}\n{code}\n```"
        return self._complete(p)

class OpenAIProvider(RefactorProvider):
    def __init__(self, model: str = None, api_key: str = None, base_url: str = None):
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.model = model or os.getenv("OPENAI_MODEL", "gpt-4o-mini")
        self.base_url = base_url or os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
    def _chat(self, system: str, user: str) -> Optional[str]:
        if not self.api_key:
            return None
        try:
            headers = {"Authorization": f"Bearer {self.api_key}"}
            data = {
                "model": self.model,
                "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
                "temperature": 0.1
            }
            r = requests.post(f"{self.base_url}/chat/completions", json=data, headers=headers, timeout=120)
            if r.status_code == 200:
                out = r.json()["choices"][0]["message"]["content"]
                return out
        except Exception:
            return None
        return None
    def refactor(self, code, filename, language):
        sys = "You are a strict refactoring assistant. Output only code."
        usr = f"Refactor the following {language} code. Return only code.\nFILE: {filename}\n\n```{language}\n{code}\n```"
        return self._chat(sys, usr)
    def explain(self, code, filename, language):
        sys = "You are an expert code reviewer. Produce concise, well-structured explanations."
        usr = f"Explain this {language} file with headings Overview, Key Components, Important Functions/Classes, Step-by-step, Risks/Smells, Suggestions.\n\n```{language}\n{code}\n```"
        return self._chat(sys, usr)
    def trace_core_logic(self, code, filename, language):
        sys = "You are an expert at extracting core logic. Be precise."
        usr = f"Extract core logic as numbered steps with minimal code blocks.\nFILE: {filename}\n\n```{language}\n{code}\n```"
        return self._chat(sys, usr)

class GeminiProvider(RefactorProvider):
    """Uses Google Gemini API via google-genai; requires GEMINI_API_KEY. Optional."""
    def __init__(self, model: str = None, api_key: str = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        self.model = model or os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
    def _gen(self, system: str, user: str) -> Optional[str]:
        if not self.api_key:
            return None
        try:
            from google import genai
            client = genai.Client(api_key=self.api_key)
            resp = client.responses.create(
                model=self.model,
                system_instruction=system,
                input=[{"role":"user","content":user}]
            )
            return resp.output_text
        except Exception:
            return None
    def refactor(self, code, filename, language):
        sys = "You are a strict refactoring assistant. Output only code."
        usr = f"Refactor the following {language} code. Return only code.\nFILE: {filename}\n\n```{language}\n{code}\n```"
        return self._gen(sys, usr)
    def explain(self, code, filename, language):
        sys = "You are an expert code reviewer. Produce concise, well-structured explanations."
        usr = f"Explain this {language} file with headings Overview, Key Components, Important Functions/Classes, Step-by-step, Risks/Smells, Suggestions.\n\n```{language}\n{code}\n```"
        return self._gen(sys, usr)
    def trace_core_logic(self, code, filename, language):
        sys = "You are an expert at extracting core logic. Be precise."
        usr = f"Extract core logic as numbered steps with minimal code blocks.\nFILE: {filename}\n\n```{language}\n{code}\n```"
        return self._gen(sys, usr)

def default_chain():
    # Order: Ollama (local, free) -> Gemini (optional) -> OpenAI (backup)
    return [OllamaProvider(), GeminiProvider(), OpenAIProvider()]

def language_from_filename(name: str) -> str:
    ext = name.split('.')[-1].lower()
    return {
        "py": "python", "js": "javascript", "ts": "typescript",
        "java": "java", "cpp": "cpp", "c": "c", "cs": "csharp",
        "go": "go", "rs": "rust", "rb": "ruby", "php": "php",
        "kt": "kotlin", "swift": "swift", "html": "html",
        "css": "css", "json": "json", "md": "markdown"
    }.get(ext, "text")
