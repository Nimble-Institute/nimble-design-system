import React from 'react';
import type {Meta} from '@storybook/react';

import {NimbleFileUploader} from '../src';

const NimbleFileUploaderStory: Meta<typeof NimbleFileUploader> = {
  title: 'Nimble Project Specific/Nimble File Uploader',
  component: NimbleFileUploader,
  parameters: {
    // layout: 'fullscreen',
    docs: {iframeHeight: 600, previewSource: 'open'},
  },
};

export default NimbleFileUploaderStory;

export const NimbleFileUpload = {
  args: {
    onFileSelect: (fileName: string, data: string, size: string, id: string | null) =>
      console.log('Call post API', fileName, data, size, id),
    uploadedFiles: [
      {
        id: 1,
        fileName:
          'Netherlands Maritime Technology logo zhgxchji dkfjhajsdhjahs djahsdjhasdjhqjd ajkhsdjklshdjshjkshdjl.jpeg',
        fileSize: '200KB',
      },
      {
        id: 2,
        fileName: 'Nimble Institute Logo kzjghjka sdjkahjklsdhjaklsdjklajsdkljaskldakljsd.png',
        fileSize: '400KB',
      },
      {
        id: 3,
        fileName: 'Nimble Project Map.pdf',
        fileSize: '10KB',
      },
      {
        id: 4,
        fileName: 'Project Planning.docx',
        fileSize: '800KB',
      },
      {
        id: 5,
        fileName: 'Nimble Road Map.png',
        fileSize: '800KB',
      },
      {
        id: 6,
        fileName: 'Design System Planning.pdf',
        fileSize: '8KB',
      },
      {
        id: 7,
        fileName: 'Project Performance.pdf',
        fileSize: '800KB',
      },
      {
        id: 8,
        fileName: 'Project Guidlines.docx',
        fileSize: '100KB',
      },
      {
        id: 9,
        fileName: 'Performance Overview.png',
        fileSize: '700KB',
      },
    ],
    isUploadButtonRequired: true,
  },
};
