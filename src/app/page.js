'use client';

import { useState } from 'react';
import Link from 'next/link'


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
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 mt-4 space-x-4">
            <button
              onClick={() => setCount(count + 1)}
              className="btn btn-neutral m-2 shadow-lg"
            >
              点击 {count} 次
            </button>
            <Link href="/dashboard" className="btn btn-warning m-2 shadow-lg">
                查看仪表盘
            </Link>
            <Link href="/scene" className="btn btn-accent m-2 shadow-lg">
                查看场景图
            </Link>
            <Link href="/chatroom" className="btn btn-info m-2 shadow-lg">
                查看聊天室
            </Link>
          </div>
        </div>
        <div className="divider divider-secondary max-w-4xl">OR</div>
        <div className="card max-w-4xl bg-secondary rounded-box grid place-items-center" >
          <div className="text-primary-content mt-2 font-bold">BIM File Input</div>
          <input type="file" className="m-2 file-input file-input-md file-input-accent" />
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
