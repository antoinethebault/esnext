//Let
let favoriteCityId = "rome";
console.log(favoriteCityId);
favoriteCityId = "paris"
console.log(favoriteCityId);

//Const
const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];
console.log(citiesId);
//citiesId = [];
citiesId.push("tokyo");
console.log(citiesId);

//Creation d'objet
function getWeather(cityId){
    let city = cityId;
    let temperature = 20;
    return {city, temperature};
}
const weather = getWeather(favoriteCityId);
console.log(weather);

//affectation destructuree
let {city, temperature} = weather;
console.log(city);
console.log(temperature);

//Rest operator
const[parisId, nycId, ...otherCitiesId] = citiesId;
console.log(parisId);
console.log(nycId);
console.log(otherCitiesId.length);

//Classe
class Trip{
    constructor(id, name, imageUrl){
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }
    toString(){
        return 'Trip ['+this.id+', '+this.name+', '+this.imageUrl+', '+this._price+']';
    }
    set price(price){
        this._price = price;
    }
    get price(){
        return this._price;
    }
    static getDefaultTrip(){
        return new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg');
    }
}
const parisTrip = new Trip('paris', 'Paris', 'img/paris.jpg');
console.log(parisTrip);
console.log(parisTrip.name);
console.log(parisTrip.toString());
parisTrip.price = 100;
console.log(parisTrip.toString());
const defaultTrip = Trip.getDefaultTrip();
console.log(defaultTrip.toString());

//Heritage
class FreeTrip extends Trip{
    constructor (id, name, imageUrl){
        super(id, name, imageUrl);
        super.price = 0;
    }
    toString(){
        return 'Free'+super.toString();
    }
}
const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg');
console.log(freeTrip.toString());

//Promise, Set, Map, Arrow Function
class TripService {
    constructor() {
        this.trips = [new Trip('paris', 'Paris', 'img/paris.jpg'),
                new Trip('nantes', 'Nantes', 'img/nantes.jpg'),
                new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg')];
    }
    findByName(tripName) {
        return new Promise((resolve, reject) => { setTimeout( () => {
            // ici l'exécution du code est asynchrone
            // TODO utiliser resolve et reject en fonction du résultat de la recherche
            let elementTrouve = false;
            this.trips.forEach((element)=>{
                if (element.name == tripName){
                    resolve(element);
                    elementTrouve = true;
                }
            });
            if(elementTrouve == false){
                reject("No trip with name "+tripName);
            }
        }, 2000) });
    }
}
class PriceService {
    constructor() {
        this.map = new Map();
        this.map.set('paris', 100);
        this.map.set('rio-de-janeiro', 800);
        //map.set('nantes')
    }
    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => { setTimeout( () => {
            // ici l'exécution du code est asynchrone
            // TODO utiliser resolve et reject en fonction du résultat de la recherche
            if (this.map.has(tripId)){
                resolve(this.map.get(tripId));
            }else{
                reject('No price found for id '+tripId);
            }

        }, 2000)
        });
    }
}
const tripService = new TripService();
const priceService = new PriceService();
tripService.findByName('Paris')
    .then((value) => {console.log('Trip found : '+value.toString());})
    .catch((value) => {console.log(value)});
tripService.findByName('Toulouse')
    .then((value) => {console.log('Trip found : '+value.toString());})
    .catch((value) => {console.log(value)});
tripService.findByName('Rio de Janeiro')
    .then((value) => {priceService.findPriceByTripId(value.id)
        .then((value) => {console.log('Price found : '+value)})
        .catch((value) => console.log(value))})
    .catch((value) => {console.log(value)});
tripService.findByName('Nantes')
    .then((value) => {priceService.findPriceByTripId(value.id)
        .then((value) => {console.log('Price found : '+value)})
        .catch((value) => console.log(value))})
    .catch((value) => {console.log(value)});