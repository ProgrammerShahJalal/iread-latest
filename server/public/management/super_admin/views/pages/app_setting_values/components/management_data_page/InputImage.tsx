import React, { useRef, useState } from 'react';

export interface Props {
  name: string;
  label: string;
  defalut_preview?: string | string[] | null; // Support single or multiple previews
  multiple?: boolean; // Allow multiple file uploads
}

const InputImage: React.FC<Props> = ({ name, label, defalut_preview, multiple = false, ...props }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>( // Store multiple previews
    Array.isArray(defalut_preview) ? defalut_preview : defalut_preview ? [defalut_preview] : []
  );

  // Handle file selection and generate previews
  const handleFileChange = () => {
    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const files = Array.from(fileInput.files);
      const newPreviews = files.map((file) => {
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
        setPreviews((prev) => (multiple ? [...prev, ...results] : [results[0]])); // Append or replace based on multiple prop
      });
    }
  };

  // Remove an image from the preview
  const handleRemoveImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input to allow re-upload
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
        multiple={multiple} // Enable multiple file selection if prop is true
        {...props}
      />
      {previews.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
          {previews.map((preview, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <img
                src={preview}
                alt={`Preview ${index}`}
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
