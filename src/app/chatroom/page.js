'use client';

import {useEffect, useRef } from 'react';
import useChatStore from '@/app/store/chatStore';
import useCameraStore from '@/app/store/cameraStore';
import CameraScene from '@/app/components/CameraScene';

export default function WebSocketTest() {
  const {
    messages,
    inputMessage,
    connectionStatus,
    setMessages,
    setInputMessage,
    setConnectionStatus,
    clearState,
    wsUrl
  } = useChatStore();

  const {setPoseData} = useCameraStore();

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

    ws.current = new WebSocket(wsUrl);

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
    // 如果是服务器发送的消息，尝试解析为 poseData
    if (sender === '服务器') {
      try {
        const data = JSON.parse(message);
        if (data && data.position && data.orientation) {
          setPoseData(data);
          // console.log('从服务器接收到 poseData:', data);
          // return; // 如果是 poseData，不添加到消息列表
        }
      } catch (e) {
        // 如果不是有效的 JSON，继续作为普通消息处理
      }
    }
    
    // 添加普通消息到消息列表
    setMessages([{sender, message, timestamp: new Date().toLocaleTimeString()}]);
  };

  return (
    <div className="card p-4 m-2 mx-w-auto bg-accent/85 shadow-lg">
      <h1 className="text-2xl text-base-content font-bold mb-2">Echo Chat Room</h1>
      
      <div className="mb-4">
        <p className="mb-2 font-bold text-base-content/75">连接状态: {connectionStatus}</p>
        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            value={wsUrl}
            onChange={(e) => setWsUrl(e.target.value)}
            className="border rounded-box px-4 py-2"
            placeholder="输入WebSocket地址..."
          />
        </div>
        <div className="flex gap-4">
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
      <div className="card bg-base-100 mt-2 shadow-lg border-2 border-neutral">
        <CameraScene />
      </div>
    </div>
  );
} 