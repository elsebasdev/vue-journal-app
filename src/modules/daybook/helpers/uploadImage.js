import axios from "axios";


const uploadImage = async (file) => {


    if(!file) return

    try {
        
        const formData = new FormData();
        formData.append('upload_preset', 'vue-upload')
        formData.append('file', file)

        const BaseUrl = 'https://api.cloudinary.com/v1_1/dtdcz8i2v/image/upload'

        const { data } = await axios.post(BaseUrl,formData)

        return data.secure_url




    } catch (error) {
        console.log("error al cargar imagen");
    }


}

export default uploadImage