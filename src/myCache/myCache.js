const imgCache = [];

class ImgCache {
    constructor(name, url, expirationDate) {
        this.name = name,
        this.url = url,
        this.expirationDate = expirationDate
    }
}

function saveImgCache(name, url) {
    const expirationDate = Date.now() + 12 * 60 * 60 * 1000; // 12hs
    const newImg = new ImgCache(name, url, expirationDate);
    imgCache.push(newImg);
    console.log("Se guardó la imagen en cache");
    return
}

function getImgCache(imageName) {
    //Obtener el index de la img en cache para luego eliminarla si expiró
    const cachedImageIndex = imgCache.findIndex(img => img.name === imageName);
    if (cachedImageIndex !== -1) {
        const cachedImage = imgCache[cachedImageIndex];
        if (cachedImage.expirationDate > Date.now()) {
            const imageUrl = cachedImage.url;
            // Devolver imagen en caché
            console.log("Se devolvió la imagen en cache");
            return imageUrl;
        } else {
            // Eliminar el objeto de la caché si ha expirado
            imgCache.splice(cachedImageIndex, 1);
        }
    }
    return null; // No se encontró la imagen en la caché o ha expirado
}

module.exports = { saveImgCache, getImgCache };