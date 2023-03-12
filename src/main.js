import { render } from './render.js';
import TripPresenter from './presenter/presenter.js';
import PointsModel from './model/points-model.js';
import FilterView from './view/filter-view.js';
import { getMockPoints, getDestinations, getOffersByType } from './mock/task.js';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.trip-main');

const tripPresenter = new TripPresenter(siteMainElement.querySelector('.trip-events'));
const pointsModel = new PointsModel();

const points = getMockPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

render(new FilterView(), siteHeaderElement.querySelector('.trip-controls__filters'));

pointsModel.init(points, destinations, offersByType);
tripPresenter.init(pointsModel);
