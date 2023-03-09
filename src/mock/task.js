import { getRandomArrayElement, getRandomPositiveInteger } from '../utils';
import { createRandomDates } from './dates';

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const OFFER_TITLES = ['Upgrade to a business class', 'Order Uber'];
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];
const NAMES = ['Ekaterinburg', 'Chelyabinsk', 'Berezovski', 'Moscow', 'Saint-Petersburg', 'Kazan', 'Toronto', 'Washington', 'Raleigh', 'Paris', 'Rim'];

const MIN_OFFER_PRICE = 20;
const MAX_OFFER_PRICE = 200;

const MIN_PRICE = 100;
const MAX_PRICE = 4000;

const createDestination = (index) => ({
  id: index + 1,
  description: getRandomArrayElement(DESCRIPTIONS),
  name: getRandomArrayElement(NAMES),
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${getRandomPositiveInteger(1, 100)}`,
      description: getRandomArrayElement(DESCRIPTIONS)
    }
  ]
});

const createOffer = (index) => ({
  id: index + 1,
  title: getRandomArrayElement(OFFER_TITLES),
  price: getRandomPositiveInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
});

const createOfferByType = () => ({
  type: getRandomArrayElement(POINT_TYPES),
  offers: Array.from({ length: getRandomPositiveInteger(3, 8) }, (value, index) => createOffer(index))
});

const offersByType = Array.from({ length: 10 }, createOfferByType);
const destinations = Array.from({ length: getRandomPositiveInteger(1, 5) }, (value, index) => createDestination(index));

const getRandomIdsArray = () => {
  const offers = getRandomArrayElement(offersByType).offers;
  const ids = [];
  const lengthOfArray = getRandomPositiveInteger(1, offers.length);
  while (ids.length < lengthOfArray) {
    const element = getRandomPositiveInteger(0, offers.length);
    if (!ids.includes(element)) {
      ids.push(element);
    }
  }
  return ids;
};

const createPoint = (count) => {
  const randomDates = createRandomDates();

  return {
    basePrice: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: randomDates.dateFrom,
    dateTo: randomDates.dateTo,
    destination: getRandomArrayElement(destinations).id,
    id: count,
    isFavorite: Boolean(getRandomPositiveInteger(0, 1)),
    offers: getRandomIdsArray(),
    type: getRandomArrayElement(POINT_TYPES)
  };
};

const createMockPoints = (count) => Array.from({ length: count }, (value, index) => createPoint(index));

export { createMockPoints, destinations, offersByType };
