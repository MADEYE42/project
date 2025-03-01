import React from 'react';
import { Upload, Database, Layers3 as Layers3D, FileImage, FileJson, User, Download, BarChart3 } from 'lucide-react';

const features = [
  {
    name: 'User Authentication',
    description: 'Secure login with email/password and optional two-factor authentication for data protection.',
    icon: User,
  },
  {
    name: 'Image Upload',
    description: 'Drag-and-drop functionality for ultrasound image uploads with preview and progress indication.',
    icon: FileImage,
  },
  {
    name: 'Metadata Integration',
    description: 'Upload and process JSON metadata files associated with ultrasound images for comprehensive analysis.',
    icon: FileJson,
  },
  {
    name: 'Image Segmentation',
    description: 'Advanced algorithms for bone segmentation with noise reduction and contrast enhancement.',
    icon: Upload,
  },
  {
    name: '3D Rendering',
    description: 'Convert segmented 2D images to interactive 3D models with surface mesh generation and texture mapping.',
    icon: Layers3D,
  },
  {
    name: 'Results Dashboard',
    description: 'Comprehensive dashboard to view, compare, and analyze processed images and 3D renderings.',
    icon: BarChart3,
  },
  {
    name: 'Secure Data Storage',
    description: 'End-to-end encryption and HIPAA/GDPR compliant storage for all patient data and images.',
    icon: Database,
  },
  {
    name: 'Export Functionality',
    description: 'Download options for processed images and 3D models in various formats for further analysis.',
    icon: Download,
  },
];

const Features: React.FC = () => {
  return (
    <div id="features" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Advanced Capabilities</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Bone Imaging Features
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our application provides a complete suite of tools for medical professionals to analyze and visualize bone structures
            through advanced ultrasound imaging processing.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;