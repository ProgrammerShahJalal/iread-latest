import React, { useRef, useState, useEffect } from 'react';

export interface Props {
  name: string;
  label: string;
  defalut_preview?: string | string[] | null;
  multiple?: boolean;
  onImageChange?: (data: { files: File[]; previews: string[] }) => void;
}

const InputImage: React.FC<Props> = ({ name, label, defalut_preview, multiple = false, onImageChange, ...props }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uiPreviews, setUiPreviews] = useState<string[]>(() => {
    if (Array.isArray(defalut_preview)) {
      return defalut_preview.filter((path) => typeof path === 'string');
    }
    if (typeof defalut_preview === 'string' && defalut_preview) {
      return [defalut_preview];
    }
    return [];
  });
  const [files, setFiles] = useState<File[]>([]);
  const [serverPreviews, setServerPreviews] = useState<string[]>(() => {
    if (Array.isArray(defalut_preview)) {
      return defalut_preview.filter((path) => typeof path === 'string' && !path.startsWith('data:'));
    }
    if (typeof defalut_preview === 'string' && defalut_preview && !defalut_preview.startsWith('data:')) {
      return [defalut_preview];
    }
    return [];
  });

  // Initialize previews based on defalut_preview
  useEffect(() => {
    const initialPreviews = (() => {
      if (Array.isArray(defalut_preview)) {
        return defalut_preview.filter((path) => typeof path === 'string' && !path.startsWith('data:'));
      }
      if (typeof defalut_preview === 'string' && defalut_preview && !defalut_preview.startsWith('data:')) {
        return [defalut_preview];
      }
      return [];
    })();

    // Only update if serverPreviews or files have changed
    if (JSON.stringify(initialPreviews) !== JSON.stringify(serverPreviews) || files.length > 0) {
      setServerPreviews(initialPreviews);
      setUiPreviews(initialPreviews);
      setFiles([]);
    }
  }, [defalut_preview]);

  // Notify parent of state changes
  useEffect(() => {
    onImageChange?.({ files, previews: serverPreviews });
  }, [files, serverPreviews, onImageChange]);

  const handleFileChange = () => {
    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const newFiles = Array.from(fileInput.files).filter(file => file.size > 0);
      if (newFiles.length === 0) {
        console.log('No valid files selected');
        return;
      }
      const newPreviews = newFiles.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result);
            }
          };
        });
      });

      Promise.all(newPreviews).then((results) => {
        setUiPreviews((prev) => (multiple ? [...prev, ...results] : [results[0]]));
        setFiles((prev) => {
          const updatedFiles = multiple ? [...prev, ...newFiles] : [newFiles[0]];
          console.log('Updated files state:', updatedFiles.map(f => ({ name: f.name, size: f.size })));
          return updatedFiles;
        });
      });
    } else {
      console.log('No files selected in handleFileChange');
    }
  };

  const handleRemoveImage = (index: number) => {
    setUiPreviews((prev) => prev.filter((_, i) => i !== index));
    setServerPreviews((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => {
      const updatedFiles = prev.filter((_, i) => i !== index);
      console.log('Files after removal:', updatedFiles.map(f => ({ name: f.name, size: f.size })));
      return updatedFiles;
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <label>{label}</label>
      <input
        type="file"
        name={name}
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple={multiple}
        {...props}
      />
      {uiPreviews.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
          {uiPreviews.map((preview, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                style={{ maxHeight: '80px', objectFit: 'cover' }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                }}
                aria-label={`Remove image ${index + 1}`}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default InputImage;
