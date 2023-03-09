import { render } from './render.js';
import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/presenter.js';
import PointsModel from './model/points-model.js';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.trip-main');

const boardPresenter = new BoardPresenter();
const pointsModel = new PointsModel();

render(new FilterView(), siteHeaderElement.querySelector('.trip-controls__filters'));

boardPresenter.init(siteMainElement.querySelector('.trip-events'), pointsModel);
