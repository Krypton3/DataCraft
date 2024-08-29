// app/page.tsx
"use client"
import React, { useState } from 'react';
import { Button } from '@nextui-org/react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(`File uploaded successfully: ${data.filename}`);
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <input 
          type="file" 
          id="file-upload" 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
        />
        <label 
          htmlFor="file-upload" 
          style={{
            padding: '12px 24px',
            border: '2px solid #ccc',
            borderRadius: '24px',
            cursor: 'pointer',
            display: 'inline-block',
            minWidth: '300px',
            textAlign: 'center',
            fontSize: '18px',
            color: '#555',
            backgroundColor: '#f9f9f9',
          }}
        >
          {selectedFile ? selectedFile.name : "Input File"}
        </label>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}
