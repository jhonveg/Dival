import axios from './axios'


export const uploadAvatarRequest = async (avatar) => {
   
      const response = await axios.post('/image', avatar, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response; 
   
  };
  
  export const updateAvatarRequest = async (avatar) => {
   
    const response = await axios.put('/image', avatar, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response; 
 
};

  export const uploadCourseImageRequest = async (id, avatar) => {
   
    const response = await axios.post(`/image/course/${id}`, avatar, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response; 
 
};



export const updateCourseImageRequest = async (id, imagen) => {
   
  const response = await axios.put(`/image/course/${id}`, imagen, {
  
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response; 

};
