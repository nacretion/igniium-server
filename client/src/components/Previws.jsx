import React, {useContext, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import Modal from "./UI/Modal/Modal";
import {VisibleContext} from "../context";
import classes from "./models/Previews.module.css"

const thumbsContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: "1vh",
    minHeight: "calc(7vh + 7vw)",
};

const dropzone = {
    height: "10vh",
}

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: "100%",
    height: "20vh",
    padding: 4,

    minHeight: "calc(7vh + 7vw)",
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    width: '100%',
    overflow: 'hidden',
    minHeight: "calc(5vh + 5vw)",
};

const img = {
    width: 'auto',
    minHeight: "calc(7vh + 7vw)",
    maxWidth: "calc(50vh + 50vw)"
};

const container = {
    border: "1px dotted #bbb",
    margin: "3vh 0",
    minHeight: "calc(8vh + 8vw)",
}

const previewImage = {
    minHeight: "calc(2vh + 2vw)",
    maxHeight: "calc(30vh + 30vw)",
    maxWidth: "calc(50vh + 50vw)"
}

const heading = {
    fontSize: "calc(1vh + 1vw)"
}
const headingError = {
    ...heading,
    color: "red"
}


export default function Previews(props) {
    const {modalShowPreview, setModalShowPreview} = useContext(VisibleContext);
    const [files, setFiles] = useState([]);
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject
    } = useDropzone({
        accept: 'image/*',
        multiple: false,
        onDrop: acceptedFile => {
            setFiles(acceptedFile.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));

        }
    });

    const [image, setImage] = useState({})

    const setImageUrl = (url) => {
        setImage(
            {url: url}
        )
        setModalShowPreview(true)
    }

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    onClick={() => setImageUrl(file.preview)}
                    src={file.preview}
                    style={img}
                    alt="preview of uploaded file"
                />
            </div>
        </div>
    ));

    return (
        <>
            <Modal visible={modalShowPreview} setVisible={setModalShowPreview}>
                <img style={previewImage} src={image.url} alt=""/>
            </Modal>
            <section className={props.className} style={container}>
                <div
                    style={dropzone}
                    {...getRootProps(isDragActive ? {className: 'dropzone dropzoneHover'} : {className: 'dropzone'})}>
                    {!isDragActive
                        ? <>
                            <p style={heading}>Title preview</p>
                            <input {...getInputProps()} />
                            <p className={classes.uploadText}>{
                                window.innerWidth < 400
                                    ? "Upload file"
                                    : "Drag 'n' drop some files here, or click to select files"
                            }</p>
                        </>
                        : isDragReject ? <p style={headingError}>!!! Drop only one file !!!</p> :
                            <p style={heading}>Drop file</p>}
                </div>
                {
                    files.length > 0 ?
                        <aside style={thumbsContainer}>
                            {thumbs}
                        </aside> :
                        <></>

                }

            </section>
        </>
    );
}