import React from 'react';

const Workflow: React.FC = () => {
  return (
    <div id="workflow" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Processing Pipeline</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Image Segmentation Workflow
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our sophisticated image processing pipeline transforms raw ultrasound images into detailed 3D bone models
            through a series of advanced algorithms and techniques.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
            
            <div className="space-y-12">
              {/* Step 1: Preprocessing */}
              <div className="relative">
                <div className="flex items-start">
                  <div className="flex h-9 items-center">
                    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                      <span className="text-sm font-semibold">1</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Preprocessing</h3>
                    <div className="mt-3 rounded-lg bg-white p-6 shadow-md">
                      <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li>Noise reduction through Gaussian filtering</li>
                        <li>Contrast enhancement for better feature visibility</li>
                        <li>Normalization to standardize image characteristics</li>
                      </ul>
                      <div className="mt-4">
                        <img
                          src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                          alt="Image preprocessing visualization"
                          className="h-48 w-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2: Segmentation */}
              <div className="relative">
                <div className="flex items-start">
                  <div className="flex h-9 items-center">
                    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                      <span className="text-sm font-semibold">2</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Segmentation</h3>
                    <div className="mt-3 rounded-lg bg-white p-6 shadow-md">
                      <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li>Implementation of U-Net architecture for bone segmentation</li>
                        <li>Validation against ground truth segmentations</li>
                        <li>Post-processing to refine segmentation boundaries</li>
                      </ul>
                      <div className="mt-4">
                        <img
                          src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                          alt="Image segmentation visualization"
                          className="h-48 w-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3: 3D Reconstruction */}
              <div className="relative">
                <div className="flex items-start">
                  <div className="flex h-9 items-center">
                    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                      <span className="text-sm font-semibold">3</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">3D Reconstruction</h3>
                    <div className="mt-3 rounded-lg bg-white p-6 shadow-md">
                      <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li>Marching cubes algorithm for surface extraction</li>
                        <li>Mesh smoothing and optimization for visual quality</li>
                        <li>Texture mapping based on original ultrasound data</li>
                      </ul>
                      <div className="mt-4">
                        <img
                          src="https://images.unsplash.com/photo-1557825835-70d97c4aa567?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                          alt="3D reconstruction visualization"
                          className="h-48 w-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Performance Metrics */}
          <div className="mt-16 rounded-lg bg-blue-50 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-md bg-white p-4 shadow-sm">
                <div className="text-sm text-gray-500">Segmentation Accuracy</div>
                <div className="mt-1 text-3xl font-semibold text-blue-600">≥ 0.85</div>
                <div className="mt-1 text-sm text-gray-500">Dice coefficient</div>
              </div>
              <div className="rounded-md bg-white p-4 shadow-sm">
                <div className="text-sm text-gray-500">Processing Time</div>
                <div className="mt-1 text-3xl font-semibold text-blue-600">&lt; 60s</div>
                <div className="mt-1 text-sm text-gray-500">Per image</div>
              </div>
              <div className="rounded-md bg-white p-4 shadow-sm">
                <div className="text-sm text-gray-500">System Uptime</div>
                <div className="mt-1 text-3xl font-semibold text-blue-600">99.5%</div>
                <div className="mt-1 text-sm text-gray-500">Availability</div>
              </div>
              <div className="rounded-md bg-white p-4 shadow-sm">
                <div className="text-sm text-gray-500">User Satisfaction</div>
                <div className="mt-1 text-3xl font-semibold text-blue-600">≥ 4/5</div>
                <div className="mt-1 text-sm text-gray-500">Survey scores</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflow;