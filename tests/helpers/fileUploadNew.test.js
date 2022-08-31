import { fileUpload } from "../../src/helpers/fileUpload"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name:'daniel-mateu-pardo',
    api_key:'689677211246833',
    api_secret: 'uFjZnQeWP7HuEfSv1cxaQqoiZ50',
    secure: true
});

describe('Pruebas sobre fileUploadNew', () => {
    
    test('Debe de subir el archivo correctamente a Cloudinary', async() => {  
        

        const imageUrl = 'https://iso.500px.com/wp-content/uploads/2014/07/big-one.jpg';

        const resp = await fetch(imageUrl);
        const blob = await resp.blob()
        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload(file)
        // console.log(url);

        expect(typeof url).toBe('string');

        const segments = url.split('/');
        // console.log(segments);
        const imageId = segments[segments.length -1].replace('.jpg', '');
        // console.log({imageId});
        const cloudResponse = await cloudinary.api.delete_resources(['journal/' + imageId], {resource_type: 'image'});
        // console.log({cloudResponse});


    })

    test('Debe de retornar null', async() => { 

        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file)

        expect(url).toBe(null);
    })
})