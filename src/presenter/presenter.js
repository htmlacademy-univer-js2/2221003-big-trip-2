import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import EditFormView from '../view/edit-form-view.js';
import WaypointView from '../view/waypoint-view.js';
import TripEventsView from '../view/trip-events-view.js';

export default class TripPresenter {

  #pointsList = null;
  #tripContainer = null;
  #pointsModel = null;

  #tripPoints = [];

  constructor() {
    this.#pointsList = new TripEventsView();
  }

  init(tripContainer, pointsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#tripPoints = [...this.#pointsModel.point];

    render(new SortView(), this.#tripContainer);
    render(this.#pointsList, this.#tripContainer);

    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoints(this.#tripPoints[i]);
    }
  }

  #renderPoints = (point) => {
    const pointComponent = new WaypointView(point);
    const pointEditComponent = new EditFormView(point);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const replacePointToForm = () => {
      this.#pointsList.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#pointsList.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#pointsList.element)
  }
}
