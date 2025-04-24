'use client';

import { useState } from 'react';

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6">
      <div className="card max-w-4xl shadow-lg p-6 rounded-box bg-base-200">
        <h1 className="text-2xl font-bold mb-4">仪表盘</h1>
        
        {/* 这种设计对不同大小的屏幕都有一定的设置 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 统计卡片 */}
          <div className="stat bg-primary text-primary-content rounded-box">
            <div className="stat-title">总项目数</div>
            <div className="stat-value">89</div>
            <div className="stat-desc">↗︎ 比上周增长 14%</div>
          </div>
          
          <div className="stat bg-secondary text-secondary-content rounded-box">
            <div className="stat-title">活跃项目</div>
            <div className="stat-value">45</div>
            <div className="stat-desc">↘︎ 比上周减少 7%</div>
          </div>
          
          <div className="stat bg-accent text-accent-content rounded-box">
            <div className="stat-title">完成项目</div>
            <div className="stat-value">12</div>
            <div className="stat-desc">↗︎ 比上周增长 10%</div>
          </div>
        </div>
        {/* divider 用于功能区的划分 */}
        <div className="divider">项目列表</div>
        
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>项目名称</th>
                <th>状态</th>
                <th>进度</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BIM模型优化</td>
                <td><div className="badge badge-success">进行中</div></td>
                <td>
                  <progress className="progress progress-primary w-56" value="70" max="100"></progress>
                </td>
                <td>
                  <button className="btn btn-sm btn-primary">查看</button>
                </td>
              </tr>
              <tr>
                <td>建筑数据分析</td>
                <td><div className="badge badge-warning">待审核</div></td>
                <td>
                  <progress className="progress progress-warning w-56" value="30" max="100"></progress>
                </td>
                <td>
                  <button className="btn btn-sm btn-primary">查看</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}