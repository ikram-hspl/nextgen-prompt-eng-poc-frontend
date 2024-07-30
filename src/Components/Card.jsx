import React, {useState} from "react";
export default function Card({title, description, image}){
    const [tags, setTags] = useState(["Mobile", "Web"])
    return (
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a>
        <img class="rounded-t-lg" src="" alt="" />
    </a>
    <div class="p-5">
        <p className="mb-2 tracking-tight text-gray-900 dark:text-white"><span className="text-purple-500">HRTech</span> | Benefits</p>
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Plan Comparison</h5>
        </a> 
        {tags.map((tag) => (
            <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{tag}</button>
        ))}
    </div>
</div>
    )
}