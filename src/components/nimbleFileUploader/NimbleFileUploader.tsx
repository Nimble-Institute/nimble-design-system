import React, {useRef, useState} from 'react';
import {Box, Collapse, IconButton} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import {NimbleButton} from '../index';
import {
  Container,
  TopWrapper,
  HeaderText,
  ContentContainer,
  FileCard,
  FileCardWrapper,
  FileNameText,
  FileSizeText,
  ToolbarWrapper,
  ToolBar,
  FileThumb,
  FileThumbText,
} from './StyleWrappers';

import imageTypeSVG from '../../assets/images/fileUploader/imageType.svg';
import docxTypeSVG from '../../assets/images/fileUploader/docx.svg';
import previewSVG from '../../assets/images/fileUploader/preview.svg';
import downloadSVG from '../../assets/images/fileUploader/download.svg';
import eidtSVG from '../../assets/images/fileUploader/edit.svg';
import deleteSVG from '../../assets/images/fileUploader/delete.svg';

const ImageTypes = ['jpeg', 'png', 'jpg', 'webp'];

interface UploadedFileData {
  id: string;
  fileName: string;
  fileSize: string;
}

interface NimbleFileUploaderProps {
  width?: string;
  height?: string;
  uploadButtonText?: string;
  onFileSelect: (fileName: string, data: string, fileSize: string, id: string | null) => void;
  uploadedFiles: UploadedFileData[];
  headerFontColor?: string;
  fontFamily?: string;
  onClickPreview?: (fileName: string, id: string) => void;
  onClickDownload?: (fileName: string, id: string) => void;
  onClickDelete?: (fileName: string, id: string) => void;
  isUploadButtonRequired?: boolean;
  headerText?: string;
}

const toBase64 = (file: File): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

export const NimbleFileUploader: React.FC<NimbleFileUploaderProps> = ({
  width = '100%',
  height = '100%',
  uploadButtonText = 'UPLOAD FILES',
  onFileSelect,
  headerFontColor = '#A4C2DB',
  uploadedFiles,
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
  onClickPreview,
  onClickDownload,
  onClickDelete,
  isUploadButtonRequired = true,
  headerText = 'Uploaded Files'
}) => {
  const hiddenFileInput = useRef<any>(null);

  const [activecardIndex, setActivecardIndex] = useState(-1);
  const [fileIdForEdit, setFileIdForEdit] = useState<null | string>(null);

  const handleChange = async (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log(selectedFile);
      const fileName = selectedFile.name;
      const fileSize = Math.round(selectedFile.size / 1024);
      // const extension = fileName.substring(fileName.lastIndexOf('.') + 1);

      const data = await toBase64(selectedFile);
      onFileSelect(fileName, data, fileSize + 'KB', fileIdForEdit);
    }
  };

  const handleClick = () => {
    setFileIdForEdit(null);
    setActivecardIndex(-1);
    hiddenFileInput.current.click();
  };

  const handleClickEdit = (id: string) => {
    setFileIdForEdit(id);
    setActivecardIndex(-1);
    hiddenFileInput.current.click();
  };

  const renderFileTypeIcon = (extension: string) => {
    switch (extension) {
      case 'jpeg':
      case 'png':
      case 'jpg':
      case 'webp':
        return <img src={imageTypeSVG} />;
      case 'docx':
        return <img src={docxTypeSVG} />;
      default:
        return (
          <FileThumb>
            <FileThumbText fontFamily={fontFamily}>.{extension.toUpperCase()}</FileThumbText>
          </FileThumb>
        );
    }
  };

  return (
    <Container width={width} height={height}>
      <TopWrapper>
        {isUploadButtonRequired && (
          <NimbleButton
            label={uploadButtonText}
            variant="contained"
            onClick={handleClick}
            startIcon={<UploadFileIcon />}
            fontFamily={fontFamily}
          />
        )}

        <input type="file" onChange={handleChange} ref={hiddenFileInput} style={{display: 'none'}} />
      </TopWrapper>
      <Box>
        <HeaderText color={headerFontColor} fontFamily={fontFamily}>
          {headerText}
        </HeaderText>
        <ContentContainer>
          {uploadedFiles.map((item, index) => {
            const extension = item.fileName?.substring(item.fileName.lastIndexOf('.') + 1);
            return (
              <Box key={index}>
                <FileCard onClick={() => setActivecardIndex(activecardIndex === -1 ? index : -1)} elevation={0}>
                  <FileCardWrapper>
                    <Box>
                      {renderFileTypeIcon(extension)}
                      <FileNameText fontFamily={fontFamily}>{item.fileName}</FileNameText>
                    </Box>
                    <FileSizeText fontFamily={fontFamily}>{item.fileSize}</FileSizeText>
                  </FileCardWrapper>
                </FileCard>
                <ToolbarWrapper>
                  <Collapse in={activecardIndex === index}>
                    <ToolBar>
                      <IconButton
                        size="small"
                        onClick={
                          ImageTypes.indexOf(extension) > -1
                            ? () => onClickPreview && onClickPreview(item.fileName, item.id)
                            : () => onClickDownload && onClickDownload(item.fileName, item.id)
                        }>
                        <img src={ImageTypes.indexOf(extension) > -1 ? previewSVG : downloadSVG} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleClickEdit(item.id)}>
                        <img src={eidtSVG} />
                      </IconButton>
                      <IconButton size="small" onClick={() => onClickDelete && onClickDelete(item.fileName, item.id)}>
                        <img src={deleteSVG} />
                      </IconButton>
                    </ToolBar>
                  </Collapse>
                </ToolbarWrapper>
              </Box>
            );
          })}
        </ContentContainer>
      </Box>
    </Container>
  );
};
