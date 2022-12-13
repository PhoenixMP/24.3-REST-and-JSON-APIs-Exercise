"use strict";
const $cupcakeList = $("#cupcake-list")
const $cupcakeForm = $("#cupcake-form")
$cupcakeForm.hide()




/** Generates HTML for a cupcake Object */
function cupcakeHTML(cupcake) {

    return `<div data-cupcake-id="${cupcake.id}" >
             
               <h2 class="cupcake-flavor">Flavor: ${cupcake.flavor}</h5>
               <img
                src="${cupcake.image}">
               <p class="cupcake-size">Size: ${cupcake.size}</p>
               <p class="cupcake-rating">Rating: ${cupcake.rating}/10</p>
               <button class="delete-cupcake">
                 Delete
               </button>
           </div>
        `;
};


/**  Makes API request for all cupcakes, adds cupcake HTML to the $cupcakeList 
 */
async function getCupcakes() {
    $cupcakeList.empty();
    const res = await axios.get('http://127.0.0.1:5000//api/cupcakes');
    const cupcakes = res.data.cupcakes;

    for (let cupcake of cupcakes) {
        let $cupcake = cupcakeHTML(cupcake)
        $cupcakeList.append($cupcake);
    };

}


$('#add-cupcake').on("click", function (evt) {
    evt.preventDefault();
    $cupcakeList.hide();
    $('.form').show();
    $('.list').hide();
})

$('#submit-cupcake').on("click", async function (evt) {
    evt.preventDefault();

    let flavor = $("#cupcake-flavor").val();
    let size = $("#cupcake-size").val();
    let rating = $("#cupcake-rating").val();
    let image = $("#cupcake-image").val();

    const res = await axios.post('http://127.0.0.1:5000//api/cupcakes', { flavor, size, rating, image });

    $('.form').hide();
    $('.list').show();
    getCupcakes();
})

$('#cancel').on("click", function (evt) {
    evt.preventDefault();
    $('.form').hide();
    $('.list').show();
    getCupcakes();
})





getCupcakes();


