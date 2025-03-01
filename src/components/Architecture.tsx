import React from 'react';

const Architecture: React.FC = () => {
  return (
    <div id="architecture" className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">System Design</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Architecture Overview
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our application is built on a modern, scalable architecture designed for performance, security, and reliability.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Frontend Components */}
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Frontend Components</h3>
              <ul className="space-y-4">
                <li>
                  <div className="font-medium text-gray-900">Landing Page</div>
                  <div className="text-gray-600 mt-1">Introduction, login options, and technology information</div>
                </li>
                <li>
                  <div className="font-medium text-gray-900">User Authentication Module</div>
                  <div className="text-gray-600 mt-1">Secure login with email/password and recovery functionality</div>
                </li>
                <li>
                  <div className="font-medium text-gray-900">Upload Interface</div>
                  <div className="text-gray-600 mt-1">Drag-and-drop functionality with preview and progress indication</div>
                </li>
                <li>
                  <div className="font-medium text-gray-900">Results Dashboard</div>
                  <div className="text-gray-600 mt-1">Gallery view with interactive 3D viewer and comparison tools</div>
                </li>
              </ul>
            </div>
            
            {/* Backend Components */}
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Backend Components</h3>
              <ul className="space-y-4">
                <li>
                  <div className="font-medium text-gray-900">Authentication Server</div>
                  <div className="text-gray-600 mt-1">User credential management and access control</div>
                </li>
                <li>
                  <div className="font-medium text-gray-900">Image Processing Pipeline</div>
                  <div className="text-gray-600 mt-1">Validation, preprocessing, and segmentation algorithms</div>
                </li>
                <li>
                  <div className="font-medium text-gray-900">3D Rendering Engine</div>
                  <div className="text-gray-600 mt-1">Conversion of segmented images to 3D models with mesh generation</div>
                </li>
                <li>
                  <div className="font-medium text-gray-900">Data Storage</div>
                  <div className="text-gray-600 mt-1">Secure storage for user data, images, and processing results</div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Technology Stack */}
          <div className="mt-8 rounded-lg bg-white p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Technology Stack</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-md bg-blue-50 p-4">
                <div className="font-medium text-blue-700">Frontend</div>
                <div className="text-gray-600 mt-1">React.js, Three.js</div>
              </div>
              <div className="rounded-md bg-blue-50 p-4">
                <div className="font-medium text-blue-700">Backend</div>
                <div className="text-gray-600 mt-1">Node.js with Express</div>
              </div>
              <div className="rounded-md bg-blue-50 p-4">
                <div className="font-medium text-blue-700">Image Processing</div>
                <div className="text-gray-600 mt-1">Python with TensorFlow/PyTorch</div>
              </div>
              <div className="rounded-md bg-blue-50 p-4">
                <div className="font-medium text-blue-700">3D Rendering</div>
                <div className="text-gray-600 mt-1">VTK.js</div>
              </div>
              <div className="rounded-md bg-blue-50 p-4">
                <div className="font-medium text-blue-700">Database</div>
                <div className="text-gray-600 mt-1">MongoDB</div>
              </div>
              <div className="rounded-md bg-blue-50 p-4">
                <div className="font-medium text-blue-700">Authentication</div>
                <div className="text-gray-600 mt-1">JWT (JSON Web Tokens)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architecture;