import { render } from './render.js';
import TripPresenter from './presenter/presenter.js';
import FilterView from './view/filter-view.js';
import PointsModel from './model/points-model.js';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.trip-main');

const pointModel = new PointsModel();
const tripPresenter = new TripPresenter(siteMainElement.querySelector('.trip-events'), pointModel);


render(new FilterView(), siteHeaderElement.querySelector('.trip-controls__filters'));

tripPresenter.init();
