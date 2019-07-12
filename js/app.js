'use strict';

function startPage() {
  loadDrops();
  attachListeners();
  attachListeners2();
  attachListeners3();

}

let photoAlbum = [];
function PhotoCollect(title,path,keyword,hornNum){
  this.title = title;
  this.path= path;
  this.keyword = keyword;
  this.hornNum = hornNum;
}
PhotoCollect.prototype.toHtml = function(){
  let template = $('#gallery-template').html();
  let templateRender = Handlebars.compile(template);
  return templateRender(this);
}
$.get('./data/page-1.json',(photos)=>{
  photos.forEach((photo)=>{
    photoAlbum.push(new PhotoCollect(photo.title,photo.image_url,photo.keyword,photo.horns));
  });
  photoAlbum.forEach(newPhotos=>{
    console.log(newPhotos.toHtml());
    $('main').append(newPhotos.toHtml());
  });

}
, 'json');

function loadDrops() {
  const success = photos => appendDrop(photos);
  const failure = error => console.error(error);
  $.get('./data/page-1.json',(photos)=>{
    if(photos.length){
      success(photos);
    }else{
      failure({'message':'something is wrong'});
    }
  }, 'json');
}

//making a deduplicated keyword list
let listOfWord = [];
function keyWordList(arr){
  arr.forEach(photo =>{
    if(!listOfWord.includes(photo.keyword)){
      listOfWord.push(photo.keyword);
    }
  });
}

let listOfDrop =[];
function addKeyWord(arr){
  keyWordList(arr);
  listOfWord.forEach(word =>{
    const $newDrop = $('.dropSelect').clone();
    $newDrop.text(word);
    $newDrop.attr('value',word);
    listOfDrop.push($newDrop);
  });
}


function appendDrop(arr){
  addKeyWord(arr);
  for (let i = 0; i < listOfDrop.length; i++){
    $('select').append(listOfDrop[i]);
  }
}

function attachListeners(){
  $('.dropBox').on('change',event=>{
    const $choice = $(event.target);
    const value = $choice.val();
    if(value === 'default'){
      $('section').show();
    }else{
      $('section').each(function(){
        const $currentSection = $(this);
        let picText = $currentSection.find('p').text();
        console.log('this is the value',value);
        console.log('this is the current section',$currentSection);
        if(picText === value){
          $currentSection.show();
        }else{
          $currentSection.hide();
        }
        console.log('this is the picture keyword',picText);
      });
    }
  });
}

function attachListeners2(){
  $('.numSort').click(function(){
    //sort the pics showing in main according to their horn nums
    photoAlbum.sort((a,b)=>{
      return a.hornNum - b.hornNum;
    });
    // return photoAlbum;
    $('main').empty();
    photoAlbum.forEach(newPhotos=>{
      $('main').append(newPhotos.toHtml());
    }
    );
  });
}
function attachListeners3(){
  $('.titleSort').click(function(){
    //sort the pics showing in main according to their horn nums
    photoAlbum.sort((a,b)=>{
      if (a.title > b.title){
        return 1;
      }else if(a.title < b.title){
        return -1;
      }else{
        return 0;
      }
    });
    $('main').empty();
    photoAlbum.forEach(newPhotos=>{
      $('main').append(newPhotos.toHtml());
    }
    );
  });
}

$().ready((startPage));
