import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(() => {
      return { };
    })
    .onUploadComplete(() => {
      console.log("Upload complete");
    }),
  
  fileUploader: f(["pdf", "image", "video", "audio", "text"])
    .middleware(() => {
      return { };
    })
    .onUploadComplete(() => {
      console.log("Upload complete");
    }),
};

export type OurFileRouter = typeof ourFileRouter; 