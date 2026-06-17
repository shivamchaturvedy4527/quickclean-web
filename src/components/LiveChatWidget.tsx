"use client";

import { useEffect } from "react";

interface LiveChatWidgetProps {
  embedCode: string;
}

export function LiveChatWidget({ embedCode }: LiveChatWidgetProps) {
  useEffect(() => {
    if (!embedCode.trim()) return;

    const container = document.createElement("div");
    container.id = "live-chat-embed";
    container.innerHTML = embedCode;
    document.body.appendChild(container);

    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      if (oldScript.textContent) newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    return () => {
      container.remove();
    };
  }, [embedCode]);

  return null;
}
