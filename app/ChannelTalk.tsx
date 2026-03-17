'use client';

import { useEffect } from 'react';

export default function ChannelTalk() {
  useEffect(() => {
    const w = window as any;
    if (w.ChannelIO) return;

    // 에러가 났던 부분을 TypeScript가 이해할 수 있는 방식으로 수정했습니다.
    const ch = (...args: any[]) => {
      ch.c(args);
    };

    ch.q = [] as any[];
    ch.c = (args: any) => {
      ch.q.push(args);
    };

    w.ChannelIO = ch;

    function l() {
      if (w.ChannelIOInitialized) return;
      w.ChannelIOInitialized = true;
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://cdn.channel.io/dot/ch-plugin-loader.js';
      const x = document.getElementsByTagName('script')[0];
      if (x && x.parentNode) {
        x.parentNode.insertBefore(s, x);
      }
    }

    if (document.readyState === 'complete') {
      l();
    } else {
      window.addEventListener('DOMContentLoaded', l);
      window.addEventListener('load', l);
    }

    // 채널톡 설정 (선생님의 플러그인 키를 유지합니다)
    w.ChannelIO('boot', {
      "pluginKey": "60e9496b-0b1d-4876-8809-566d214a1e94" 
    });
  }, []);

  return null;
}