import { getRandomArrayElement, getRandomPositiveInteger } from '../utils';
import { createRandomDates } from './dates';
import { POINT_TYPES, DESCRIPTIONS, DESTINATIONS_NAMES, Price, POINTS_COUNT } from './constants';

const createPicture = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomPositiveInteger(0, 10)}`,
  description: getRandomArrayElement(DESCRIPTIONS),
});

const createDestination = (id) => ({
  id,
  description: getRandomArrayElement(DESCRIPTIONS),
  name: DESTINATIONS_NAMES[id],
  pictures: Array.from({ length: 4 }, createPicture)
});

const getDestinations = () => Array.from({ length: DESTINATIONS_NAMES.length }).map((value, index) => createDestination(index));

const createOffer = (id, pointType) => ({
  id,
  title: `offer for ${pointType}`, //getRandomArrayElement(OFFER_TITLES),
  price: getRandomPositiveInteger(Price.MIN, Price.MAX)
});

const createOffersByType = (pointType) => ({
  type: pointType,
  offers: Array.from({ length: getRandomPositiveInteger(1, 4) }).map((value, index) => createOffer(index + 1, pointType))
});

const getOffersByType = () => Array.from({ length: POINT_TYPES.length }).map((value, index) => createOffersByType(POINT_TYPES[index]));

const offersByType = getOffersByType();
const destinations = getDestinations();

const createPoint = (id) => {
  const offersByTypePoint = getRandomArrayElement(offersByType);
  const allOfferIdsByTypePoint = offersByTypePoint.offers.map((offer) => offer.id);
  const randomDates = createRandomDates();

  return {
    basePrice: getRandomPositiveInteger(Price.MIN, Price.MAX),
    dateFrom: randomDates.dateFrom,
    dateTo: randomDates.dateTo,
    destination: getRandomArrayElement(destinations).id,
    id,
    isFavorite: Boolean(getRandomPositiveInteger(0, 1)),
    offers: Array.from({ length: getRandomPositiveInteger(0, allOfferIdsByTypePoint.length) }).map(() => allOfferIdsByTypePoint[getRandomPositiveInteger(0, allOfferIdsByTypePoint.length - 1)]),
    type: getRandomArrayElement(POINT_TYPES)
  };
};

const getMockPoints = () => Array.from({ length: POINTS_COUNT }).map((value, index) => createPoint(index + 1));

export { getMockPoints, getDestinations, getOffersByType };
