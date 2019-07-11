'use strict';


let photoAlbum = [];
function PhotoCollect(title,path,descripWords){
  this.title = title;
  this.path= path;
  this.keyword = descripWords;
}
PhotoCollect.prototype.toHtml = function(){
  let template = $('#gallery-template').html();
  let templateRender = Handlebars.compile(template);
  return templateRender(this);
}
$.get('./data/page-1.json',(photos)=>{
  photos.forEach((photo)=>{
    photoAlbum.push(new PhotoCollect(photo.title,photo.image_url,photo.keyword));
  });
  photoAlbum.forEach(newPhotos=>{
    $('main').append(newPhotos.toHtml());
  });

}
, 'json');


