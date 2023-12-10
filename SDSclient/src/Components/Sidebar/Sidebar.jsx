import React, { Fragment, useState } from "react";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  ShoppingBagIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import UploadModal from "../Upload/UploadModal";
import axios from "axios"; // Import Axios

const Sidebar = ({ onSidebarItemClick }) => {
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    // Reset the file uploaded state when a new file is selected
    setIsFileUploaded(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    try {
      const response = await axios.post("/upload", formData, {
          withCredentials: true,
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });

      console.log(formData)
      // Axios automatically checks for response.ok
      console.log("File uploaded successfully!");
      setOpenModal(false);
      // Update the state to indicate that a file has been uploaded
      setIsFileUploaded(true);
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };
  
  return (
    <Fragment>
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 bg-slate-100 shadow-blue-gray-900/5">
        <button onClick={() => setOpenModal(true)} className="mb-2 p-4 flex justify-center bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-300">
          NEW
        </button>
        <List>
          <Link to="/print-files">
            <ListItem className="text-lg p-3">
              <ListItemPrefix>
                  <ShoppingBagIcon className="h-6 w-6" />
              </ListItemPrefix>
              Print Files
            </ListItem>
          </Link>
          <Link to="/dashboard/trash">
            <ListItem className="text-lg p-3">
              <ListItemPrefix>
                  <InboxIcon className="h-6 w-6" />
              </ListItemPrefix>
              Trash
            </ListItem>
          </Link>
          <Link to="/dashboard/storage">
            <ListItem className="text-lg p-3">
              <ListItemPrefix>
                  <InboxIcon className="h-6 w-6" />
              </ListItemPrefix>
                Storage
            </ListItem>
          </Link>
          <ListItem className="text-lg">
            <ListItemPrefix>
              <Link to="/logout">
                <PowerIcon className="h-6 w-6" />
              </Link>
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
      <UploadModal isVisible={openModal} onClose={() => { setOpenModal(false); setIsFileUploaded(false); }} >
        <div className="sm:max-w-lg w-full px-10 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className=" text-3xl font-bold text-gray-900">
              File Upload!
            </h2>
          </div>
          {isFileUploaded ? (
            <div>
              <p className="text-green-500">File uploaded successfully!</p>
            </div>
          ) : (
          <form className="mt-2 space-y-3" onSubmit={handleUpload}>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Title</label>
              <input
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
              />            
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                    <div className="h-full w-full text-center flex flex-col items-center justify-center">
                        <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                        <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image"/>
                        </div>
                        <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a type="file" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                    </div>
                    <input type="file" name="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>
              <p className="text-sm text-gray-300">
                  <span>File type: doc,pdf,types of images</span>
              </p>
            <div>
              <button
                type="submit"  
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                >
                Upload
              </button>
            </div>
          </form>
          )}
        </div>
      </UploadModal>
    </Fragment>
  );
};

export default Sidebar;
