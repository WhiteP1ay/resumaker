#!/usr/bin/env python3
"""Block agent edits under src/components/."""

import json
import re
import sys

DENY_USER_MSG = "禁止修改 src/components/ 目录下的代码。"
DENY_AGENT_MSG = (
    "项目策略禁止修改 src/components/ 目录。"
    "请只改动其他目录，或请用户手动修改 components 下的文件。"
)

COMPONENTS_SEGMENT = "/src/components/"
COMPONENTS_SEGMENT_WIN = "\\src\\components\\"

WRITE_COMMAND_PATTERNS = (
    r">",
    r"\bsed\s+.*-i",
    r"\btee\b",
    r"\bmv\b",
    r"\bcp\b",
    r"\brm\b",
    r"\bgit\s+(checkout|restore|apply|stash\s+pop)\b",
    r"\b(nano|vim|vi|emacs)\b",
)


def is_components_path(path: str) -> bool:
    if not path:
        return False
    normalized = path.replace("\\", "/")
    return COMPONENTS_SEGMENT in normalized or normalized.rstrip("/").endswith("/src/components")


def deny() -> None:
    print(
        json.dumps(
            {
                "permission": "deny",
                "user_message": DENY_USER_MSG,
                "agent_message": DENY_AGENT_MSG,
            },
            ensure_ascii=False,
        )
    )
    sys.exit(0)


def allow() -> None:
    print(json.dumps({"permission": "allow"}))
    sys.exit(0)


def parse_input(raw: str) -> dict:
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {}


def parse_tool_input(tool_input) -> dict:
    if isinstance(tool_input, dict):
        return tool_input
    if isinstance(tool_input, str):
        try:
            parsed = json.loads(tool_input)
            return parsed if isinstance(parsed, dict) else {}
        except json.JSONDecodeError:
            return {}
    return {}


def paths_from_tool(tool_name: str, tool_input: dict) -> list[str]:
    paths: list[str] = []

    if tool_name in {"Write", "StrReplace", "Delete"}:
        for key in ("path", "file_path"):
            value = tool_input.get(key)
            if isinstance(value, str):
                paths.append(value)
    elif tool_name == "EditNotebook":
        value = tool_input.get("target_notebook")
        if isinstance(value, str):
            paths.append(value)

    return paths


def shell_targets_components(command: str) -> bool:
    normalized = command.replace("\\", "/")
    return COMPONENTS_SEGMENT in normalized or "/components/" in normalized


def shell_looks_like_write(command: str) -> bool:
    return any(re.search(pattern, command) for pattern in WRITE_COMMAND_PATTERNS)


def handle_pre_tool_use(data: dict) -> None:
    tool_name = data.get("tool_name", "")
    tool_input = parse_tool_input(data.get("tool_input", {}))

    for path in paths_from_tool(tool_name, tool_input):
        if is_components_path(path):
            deny()

    if tool_name == "Shell":
        command = tool_input.get("command", "")
        if isinstance(command, str) and shell_targets_components(command) and shell_looks_like_write(command):
            deny()

    allow()


def handle_before_shell_execution(data: dict) -> None:
    command = data.get("command", "")
    if isinstance(command, str) and shell_targets_components(command) and shell_looks_like_write(command):
        deny()
    allow()


def main() -> None:
    raw = sys.stdin.read()
    data = parse_input(raw)

    event_name = data.get("hook_event_name", "")
    if event_name == "beforeShellExecution" or ("command" in data and "tool_name" not in data):
        handle_before_shell_execution(data)
    else:
        handle_pre_tool_use(data)


if __name__ == "__main__":
    main()
