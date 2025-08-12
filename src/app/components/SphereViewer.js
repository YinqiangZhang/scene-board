'use client'

import { useState } from 'react'
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer'
import 'react-photo-sphere-viewer/dist/index.css'

export default function PanoramaViewer() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleReady = () => {
    setIsLoading(false)
    console.log('全景图片加载完成')
  }

  const handleError = (error) => {
    console.error('Photo Sphere Viewer 错误:', error)
    setError('加载全景图片时发生错误')
    setIsLoading(false)
  }

  if (error) {
    return (
      <div className="w-full h-96 md:h-[500px] lg:h-[600px] flex items-center justify-center">
        <div className="text-center text-red-500">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-lg font-semibold mb-2">加载失败</p>
          <p className="text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary mt-4"
          >
            重新加载
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-96 md:h-[500px] lg:h-[600px] relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-200 rounded-lg z-10">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg mb-4"></div>
            <p className="text-lg font-semibold">加载全景查看器中...</p>
            <p className="text-sm text-gray-500 mt-2">请稍候</p>
          </div>
        </div>
      )}
      
      <ReactPhotoSphereViewer
        src="pano_image.jpg" // 您可以替换为实际的全景图片路径
        height="100%"
        width="100%"
        plugins={[]}
        defaultZoomLvl={0}
        moveSpeed={1.5}
        zoomSpeed={1}
        mousewheel={true}
        mousemove={true}
        touchmoveTwoFingers={true}
        mousewheelCtrlKey={true}
        navbar={[
          'autorotate',
          'zoom',
          'move',
          'fullscreen'
        ]}
        onReady={handleReady}
        onError={handleError}
        containerClass="panorama-container rounded-lg overflow-hidden"
      />
      
      {/* 使用说明 */}
      <div className="text-center text-gray-500 mt-4 p-4 bg-base-100 rounded-lg">
        <h3 className="font-semibold mb-2">使用说明</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
          <div>🖱️ 鼠标拖拽：旋转视角</div>
          <div>🔍 滚轮：缩放</div>
          <div>📱 触摸：支持手势操作</div>
        </div>
        <p className="text-xs mt-3 text-gray-400">
          请将全景图片放在 public 文件夹中，并在 PhotoSphereViewer 组件中更新图片路径
        </p>
      </div>
    </div>
  )
}
