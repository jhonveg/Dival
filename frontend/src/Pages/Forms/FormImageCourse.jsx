import React, { useEffect, } from 'react'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useCourses } from '../../Context/CoursesContext';
import Loading from '../../Components/Loading';

const FormImageCourse = ({ id, id_update_image, status }) => {
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const { handleSubmit, register } = useForm();
  const { uploadCourseImage, isUpload, updateCourseImage } = useCourses();

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedImageFile(e.target.files[0])
  }


  const submitImageCourse = handleSubmit(async () => {


    const formData = new FormData();
    formData.append('image', selectedImageFile)
    try {

    

      if(id){
        const res = await uploadCourseImage(id, formData)
        console.log(res, "estatus del upload")
           
      if (res.status == 200) {
        navigate("/admin/cursos")
        window.location.reload();
      }


      }

      if( id_update_image){
        const res = await updateCourseImage(id_update_image, formData)
                 
      if (res.status === 200) {
        window.location.reload();
      }

      }

  
    } catch (error) {
      console.log(error)

    }
  })



  return (
    <div className='p-8 rounded-md shadow-md bg-dival rounded-md'>
      <form className='flex flex-col items-center' encType='multipart/form-data' onSubmit={submitImageCourse}>
        <h1 className='text-2xl font-bold text-white mb-4'>Sube una imagen</h1>
        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Presione para subir</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG o GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden"  {...register('image')}
          onChange={handleFileChange}   />
        </label>

        <button
          type='submit'
          className='w-full bg-gradient-to-l from-green-600 p-5 rounded-md mt-2 shadow-md shadow-black'
        >
          {isUpload ? (
            <>
              <Loading />
              <p>Subiendo, espere...</p>
            </>

          ) : (
            "Presiona para subir imagen"
          )}
        </button>
      </form>


      {/* <div class="flex items-center justify-center w-full">
        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden"  {...register('image')}
          onChange={handleFileChange}   />
        </label>
      </div> */}

    </div>
  )
}

export default FormImageCourse