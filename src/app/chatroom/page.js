'use client';

import {useEffect, useRef } from 'react';
import useChatStore from '@/app/store/chatStore';

export default function WebSocketTest() {
  const {
    messages,
    inputMessage,
    connectionStatus,
    setMessages,
    setInputMessage,
    setConnectionStatus,
    clearState
  } = useChatStore();

  const ws = useRef(null);

  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close();
      }
      clearState();
    };
  }, [clearState]);

  const connectWebSocket = () => {
    if (ws.current) {
      ws.current.close();
    }

    // 这里使用 wss://echo.websocket.org 作为测试服务器
    ws.current = new WebSocket('wss://echo.websocket.org');

    ws.current.onopen = () => {
      setConnectionStatus('已连接');
      addMessage('系统', '连接已建立');
    };

    ws.current.onclose = () => {
      setConnectionStatus('已断开');
      addMessage('系统', '连接已关闭');
    };

    ws.current.onmessage = (event) => {
      addMessage('服务器', event.data);
    };

    ws.current.onerror = (error) => {
      setConnectionStatus('连接错误');
      addMessage('系统', `错误: ${error.message}`);
    };
  };

  const disconnectWebSocket = () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  };

  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      addMessage('我', inputMessage);
      ws.current.send(inputMessage);
      setInputMessage('');
    }
  };

  const addMessage = (sender, message) => {
    // console.log('Current messages:', messages); // 调试日志
    setMessages([{sender, message, timestamp: new Date().toLocaleTimeString()}]);
  };

  return (
    <div className="card p-4 m-2 mx-w-auto bg-accent/85 shadow-lg">
      <h1 className="text-2xl text-base-content font-bold mb-2">Echo Chat Room</h1>
      
      <div className="mb-4">
        <p className="mb-2 font-bold text-base-content/75">连接状态: {connectionStatus}</p>
        <div className="flex gap-4 ">
          <button
            onClick={connectWebSocket}
            className="px-4 py-2 btn btn-success rounded-box hover:bg-success-focus shadow-lg border-neutral-content"
          >
            连接
          </button>
          <button
            onClick={disconnectWebSocket}
            className="px-4 py-2 btn btn-error rounded-box hover:bg-error-focus shadow-lg border-neutral-content"
          >
            断开
          </button>
        </div>
      </div>

      <div className="glass mb-4 h-96 border rounded p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-semibold">{msg.sender}: </span>
            <span>{msg.message}</span>
            <span className="text-xs text-gray-500 ml-2">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 border rounded px-4 py-2"
          placeholder="输入消息..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 btn btn-info rounded-box hover:bg-info-focus shadow-lg border-neutral-content"
        >
          发送
        </button>
      </div>
    </div>
  );
} 