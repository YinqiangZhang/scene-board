'use client';

import { useState } from 'react';
import { create } from 'zustand'

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen p-6">
        <div className="card max-w-4xl shadow-lg p-6 rounded-box bg-primary">
          <h1 className="mb-2 font-bold text-primary-content">
            欢迎来到 Next.js 学习
          </h1>
          <p className="text-primary-content/50">
            保存文件后即可看到更改
          </p>
          <div className="mt-4 space-x-4">
            <button
              onClick={() => setCount(count + 1)}
              className="btn btn-neutral"
            >
              点击 {count} 次
            </button>
            <a href="/dashboard" className="btn btn-secondary">
              查看仪表盘
            </a>
          </div>
        </div>
        <div className="divider divider-secondary max-w-4xl">OR</div>
        <div className="card max-w-4xl bg-primary rounded-box grid h-20 place-items-center" >
          <div className="text-primary-content">  
            <div className="text-primary-content">BIM File Input</div>
            <input type="file" className="file-input file-input-sm file-input-secondary" />
          </div>
        </div>
        <div className="divider divider-secondary max-w-4xl">OR</div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">What is your name?</legend>
          <input type="text" className="input" placeholder="Type here" />
          <p className="label">Optional</p>
        </fieldset>
    </div>
  );
}
