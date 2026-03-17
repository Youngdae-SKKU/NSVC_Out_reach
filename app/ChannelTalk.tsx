"use client";

import { useEffect } from 'react';

export default function ChannelTalk() {
  useEffect(() => {
    // 1. 채널톡 시스템 불러오기
    (function() {
      var w = window as any;
      if (w.ChannelIO) return;
      var ch = function() { ch.c(arguments); };
      ch.q = [] as any[];
      ch.c = function(args: any) { ch.q.push(args); };
      w.ChannelIO = ch;
      function l() {
        if (w.ChannelIOInitialized) return;
        w.ChannelIOInitialized = true;
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
        var x = document.getElementsByTagName('script')[0];
        if (x.parentNode) x.parentNode.insertBefore(s, x);
      }
      if (document.readyState === 'complete') {
        l();
      } else {
        window.addEventListener('DOMContentLoaded', l, false);
        window.addEventListener('load', l, false);
      }
    })();

    // 2. 🚀 선생님의 키를 정확한 자리에 배치했습니다!
    (window as any).ChannelIO('boot', {
      "pluginKey": "6545f537-f474-4934-9e3d-2eede88eabbb"
    });

    return () => {
      (window as any).ChannelIO('shutdown');
    };
  }, []);

  return null;
}