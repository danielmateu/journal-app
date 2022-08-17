import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
    cloud_name:'daniel-mateu-pardo', 
    api_key:'689677211246833', 
    api_secret: 'uFjZnQeWP7HuEfSv1cxaQqoiZ50',
    secure:true
});

describe('Pruebas en fileUpload', () => { 

    test('Debe de subir el archivo correctamente a Cloudinary', async() => {

        const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrtpWBKPUEDE6py6N8hwz_7Cl2UVeQ3qm5CQ&usqp=CAU';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg')

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg','');
        
        const cloudResp = await cloudinary.api.delete_resources([`journal/${imageId}`],{
            resource_type: 'image'
        });
        
        // console.log(cloudResp)
    });

    test('Debe de retornar Null', async() => { 

        const file = new File([], 'foto.jpg')

        const url = await fileUpload(file);
        expect(url).toBe(null);

        


    })


})