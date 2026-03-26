import React from 'react'
import { Link } from 'react-router-dom';

export default function Comment({post ,isPostDetails ,allCmmData}) {
 const topComments = post?.topComment;

 
const detailsUserTopComment = post?.topComment?.commentCreator;
    return (
    <>
      {!isPostDetails && topComments && <>
      <div className="flex items-center gap-2 mt-2 w-full rounded-2xl bg-[#f8fafc] border-[#d9dbdd] px-3 py-2 shadow-inner" >
              <div className="flex justify-between w-full">
               <div className="flex">
                <img src={detailsUserTopComment?.photo} alt="User Photo" className="w-10 h-12 rounded-full object-cover" />
               <div className="flex flex-col items-start justify-center ml-2">
               <h6 className="ml-2">{detailsUserTopComment?.name}</h6>
              <p className="ml-2 text-[14px]">{topComments?.content || "No comments"}</p>
               </div>
               </div>
               <div id="timeComment" className="">
                <p className="text-[12px] ">
                 { new Date(topComments?.createdAt).toLocaleDateString("en-US",{
                day: "numeric",
                month: "short",
                year: "numeric",
              
              })}
                </p>
               </div>
               </div>
            </div>
               {!isPostDetails && <div className="flex justify-end w-full mt-1 me-1.5">  {post?.commentsCount > 1 && <Link to={`/postDetails/${post._id}`} className="text-[14px] mb-1 text-blue-500">more comment</Link>} </div>}
                
            </>}
            { isPostDetails && allCmmData?.map((comment) => (
                 <div key={comment._id} className="flex items-center gap-2 mt-2 w-full rounded-2xl bg-[#f8fafc] border-[#d9dbdd] px-3 py-2 shadow-inner" >
                   <div className="flex justify-between w-full">
                     <div className="flex">
                       <img src={comment.commentCreator?.photo} alt="User Photo" className="w-10 h-12 rounded-full object-cover" />
                       <div className="flex flex-col items-start justify-center ml-2">
                         <h6 className="ml-2">{comment.commentCreator?.name}</h6>
                         <p className="ml-2 text-[14px]">{comment.content || "No comments"}</p>
                       </div>
                     </div>
                     <div id="timeComment" className="">
                       <p className="text-[12px] ">
                        { new Date(comment?.createdAt).toLocaleDateString("en-US",{
                day: "numeric",
                month: "short",
                year: "numeric",
              
              })}
                        </p>
                     </div>
                   </div>
                 </div> ))}
            </>
    )
}
