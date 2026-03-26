import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,

  
} from "@heroui/react";
import { GalleryAdd } from 'iconsax-reactjs'

export default function EditPostCreat({mutate , inputCaption , inputImgRef , handleImg  , isImg , clearImage  , onOpenChange , isOpen , onOpen  ,onOpenChangeEdit}) {
  // console.log("edit post" , onOpenChangeEdit);
  return (
    <>
      <Modal 
  isOpen={isOpen} 
  onOpenChange={onOpenChange  }
  placement="center"
  scrollBehavior="inside"
  
  classNames={{
    base: "my-8",
    wrapper: "items-center",
  }}
>
  <ModalContent className="max-h-[90vh] overflow-hidden rounded-2xl">
    
      <>
        <ModalHeader className="flex flex-col text-center gap-1 py-5">
          Create Post
        </ModalHeader>

        <ModalBody className="overflow-y-auto px-6 py-4 scrollbar-thin">
          <div className="w-full space-y-6">
            <textarea ref={inputCaption}
              className="w-full h-32 px-4 py-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
              placeholder="What's on your mind?"
            />

            {isImg && (
              <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src={isImg}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 transition"
                  type="button"
                >X
                </button>
              </div>
            )}

            <div className="flex justify-between items-center gap-4 pt-3">
              <label className="cursor-pointer">
                <GalleryAdd className="text-gray-600 hover:text-sky-600" size={28} />
                <input ref={inputImgRef}  onChange={handleImg} type="file" className="hidden" />
              </label>

              <button
                type="button"
                onClick={ () => mutate()}
                
                className="px-8 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-full text-base transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                Post
              </button>
            </div>
          </div>
        </ModalBody>

        
      </>
    
  </ModalContent>
</Modal>
    </>
  )
}
