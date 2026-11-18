#!/usr/bin/env python3
"""Idempotently create any missing chapter issues with authenticated GitHub CLI.

Use only when needed; the first eleven chapter issues were already created
through the connected GitHub app.
"""
from pathlib import Path
import json
import subprocess
import sys

root = Path(__file__).resolve().parents[1]
entries = json.loads((root / "tracking/issues.json").read_text(encoding="utf-8"))

def gh(*args):
    p = subprocess.run(["gh", *args], capture_output=True, text=True)
    if p.returncode:
        raise RuntimeError(f"gh {' '.join(args)}: {p.stderr.strip()}")
    return p.stdout.strip()

if __name__ == "__main__":
    try:
        repo = gh("repo", "view", "--json", "nameWithOwner", "--jq", ".nameWithOwner")
        existing = json.loads(gh("issue", "list", "--state", "all", "--limit", "300", "--json", "title,number"))
        titles = {item["title"] for item in existing}
        for item in entries:
            if item["title"] in titles:
                print("EXISTS", item["title"])
                continue
            body = (root / item["file"]).read_text(encoding="utf-8")
            url = gh("issue", "create", "--title", item["title"], "--body", body)
            print("CREATED", url)
    except (RuntimeError, FileNotFoundError) as error:
        sys.exit(str(error))
