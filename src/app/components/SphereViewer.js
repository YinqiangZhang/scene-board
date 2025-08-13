'use client'

import { useState } from 'react'
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer'
import { MapPlugin } from '@photo-sphere-viewer/map-plugin';
import 'react-photo-sphere-viewer/dist/index.css'
import '@photo-sphere-viewer/map-plugin/index.css';

export default function PanoramaViewer() {
  const [isLoading, setIsLoading] = useState(true)
  const [coordinates, setCoordinates] = useState(null)
  const [showCoordinates, setShowCoordinates] = useState(false)

  const handleReady = () => {
    setIsLoading(false)
    console.log('Loaded panorama image successfully!')
  }

  // 添加点击事件处理函数
  const handleClick = (event) => {
    if (!event.data.rightclick) {
      return
    }
    let pitch = event.data.pitch
    let yaw = event.data.yaw
    let texture_x = event.data.textureX
    let texture_y = event.data.textureY
    
    // set coordinates and show
    setCoordinates({
      textureX: texture_x.toFixed(0),
      textureY: texture_y.toFixed(0),
      // from rad to degree
      pitch: (pitch * 180 / Math.PI).toFixed(2),
      yaw: (yaw * 180 / Math.PI).toFixed(2)
    })
    setShowCoordinates(true)
    setTimeout(() => {
      setShowCoordinates(false)
    }, 3000)
  }

  return (
    <div className="w-full h-96 md:h-[500px] lg:h-[800px] relative">
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
        src="pano_image/0001.jpg" // 您可以替换为实际的全景图片路径
        height="100%"
        width="100%"
        plugins={[
          [
            MapPlugin,
            {
              imageUrl: 'bim_map.jpg',
              center: { x: 3588, y: 703 },
              size: '250px',
              rotation: '-133.5deg',
              defaultZoom: 25,
              shape: 'square',
            },
          ]
        ]}
        defaultZoomLvl={50}
        moveSpeed={1.5}
        zoomSpeed={1}
        mousewheel={true}
        mousemove={true}
        touchmoveTwoFingers={true}
        mousewheelCtrlKey={true}
        navbar={[
          'zoom',
          'move',
          'fullscreen'
        ]}
        onReady={handleReady}
        onClick={handleClick}
        containerClass="panorama-container rounded-lg overflow-hidden"
      />
      
      {/* 坐标信息显示卡片 */}
      {showCoordinates && coordinates && (
        <div className="absolute top-4 right-4 z-20 animate-fade-in">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 p-4 min-w-[280px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                坐标信息
              </h3>
              <button 
                onClick={() => setShowCoordinates(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg shadow-md p-3">
                  <div className="text-sm text-blue-600 font-medium mb-1">
                    <span className="font-bold">纹理坐标 X</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-blue-800">
                    <u>{coordinates.textureX}</u>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg shadow-md p-3">
                  <div className="text-sm text-green-600 font-medium mb-1">
                    <span className="font-bold">纹理坐标 Y</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-green-800">
                    <u>{coordinates.textureY}</u>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-50 rounded-lg shadow-md p-3">
                  <div className="text-sm text-purple-600 font-medium mb-1">
                    <span className="font-bold">俯仰角 (Pitch)</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-purple-800">
                    <u>{coordinates.pitch}°</u>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg shadow-md p-3">
                  <div className="text-sm text-orange-600 font-medium mb-1">
                    <span className="font-bold">偏航角 (Yaw)</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-orange-800">
                    <u>{coordinates.yaw}°</u>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                💡 右键点击全景图任意位置查看坐标
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="glass shadow-lg text-center mt-8 p-4 bg-accent rounded-lg">
        <h3 className="font-semibold text-xl mb-2">使用说明</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-md">
          <div>🖱️ <span className="font-bold">鼠标拖拽</span>：旋转视角</div>
          <div>🔍 <span className="font-bold">滚轮</span>：缩放</div>
          <div>📱 <span className="font-bold">触摸</span>：支持手势操作</div>
          <div>🖱️ <span className="font-bold">右键点击</span>：查看坐标</div>
        </div>
      </div>
    </div>
  )
}
