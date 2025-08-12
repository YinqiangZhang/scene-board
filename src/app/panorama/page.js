'use client'

import PanoramaViewer from '@/app/components/SphereViewer'


export default function Panorama() {
  return (
    <div className="min-h-screen p-6">
      <div className="card max-w-auto shadow-lg p-6 rounded-box bg-base-200">
        <h1 className="text-2xl font-bold mb-4">
          Panorama Viewer
        </h1>
        <div className="divider divider-neutral">Surrounding Environment</div>
        <div className="glass bg-accent rounded-box place-items-center shadow-lg">
          <div className="w-full">
            <PanoramaViewer />
          </div>
        </div>
      </div>
    </div>
  )
}