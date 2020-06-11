import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import './styles.css';
import { FiUpload } from 'react-icons/fi';

interface Props {
    onSetFile: (file: File) => void
}

const Dropzone: React.FC<Props> = ({onSetFile}) => {
    const  [selectedFileURL, setSelectedFileURL] = useState('');
    const onDrop = useCallback(accepteddFiles => {
        const file = accepteddFiles[0];
        const fileURL = URL.createObjectURL(file);
        setSelectedFileURL(fileURL);
        onSetFile(file);

    }, [onSetFile]);

    const {getRootProps, getInputProps} = useDropzone({onDrop, accept: 'image/*'})

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            {
                selectedFileURL ?
                    <img src={selectedFileURL} alt="thumb"/> :
                    
                    <p><FiUpload />Arraste ou clique aqui para adicionar uma imagem do estabelecimento</p>
                    
            }
        </div>
    )
}

export default Dropzone;